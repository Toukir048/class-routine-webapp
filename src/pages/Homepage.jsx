import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaClock,
  FaDoorOpen,
  FaUserTie,
  FaCalendarAlt,
  FaWifi,
} from "react-icons/fa";

import routineData from "../data/data.json";

export default function Home() {
  const [internetTime, setInternetTime] = useState(null);
  const [activeClass, setActiveClass] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchInternetTime() {
      try {
        const res = await fetch(
          "https://worldtimeapi.org/api/timezone/Asia/Dhaka"
        );
        const data = await res.json();
        setInternetTime(new Date(data.datetime));
      } catch (error) {
        setInternetTime(new Date());
      }
    }

    fetchInternetTime();
  }, []);

  useEffect(() => {
    if (!internetTime) return;

    const timer = setInterval(() => {
      setInternetTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [internetTime]);

  useEffect(() => {
    if (!internetTime) return;

    const today = internetTime.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const todayRoutine = routineData.routine.find(
      (item) => item.day.toLowerCase() === today.toLowerCase()
    );

    if (!todayRoutine) {
      setActiveClass(null);
      setStatus("No Class Today");
      return;
    }

    const currentMinutes =
      internetTime.getHours() * 60 + internetTime.getMinutes();

    let current = null;
    let upcoming = null;

    for (let cls of todayRoutine.classes) {
      const start = convertToMinutes(cls.startTime);
      const end = convertToMinutes(cls.endTime);

      if (currentMinutes >= start && currentMinutes < end) {
        current = cls;
        break;
      }

      if (currentMinutes < start && !upcoming) {
        upcoming = cls;
      }
    }

    if (current) {
      setActiveClass(current);
      setStatus("Currently Running");
    } else if (upcoming) {
      setActiveClass(upcoming);
      setStatus("Upcoming Class");
    } else {
      setActiveClass(null);
      setStatus("No More Classes Today");
    }
  }, [internetTime]);

  const progress = getProgress(activeClass, internetTime, status);
  const remaining = getRemainingTime(activeClass, internetTime, status);

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-6">
      <section className="mx-auto max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-primary text-2xl text-primary-content shadow-lg shadow-primary/30">
            <FaBookOpen />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            Class Routine
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Live class status from internet time
          </p>

          {internetTime && (
            <div className="mt-5 rounded-3xl border border-base-300 bg-base-100/80 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <FaCalendarAlt className="text-primary" />
                <span>
                  {internetTime.toLocaleDateString("en-BD", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="mt-2 text-3xl font-black text-primary">
                {internetTime.toLocaleTimeString("en-BD")}
              </p>

              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaWifi />
                <span>Internet Time • Bangladesh</span>
              </div>
            </div>
          )}
        </div>

        {activeClass ? (
          <div className="group relative rounded-[32px] p-[4px] shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary via-secondary to-accent opacity-80 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg"></div>

            <div
              className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700"
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0 round 32px)`,
              }}
            ></div>

            <div className="relative rounded-[28px] bg-base-100 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`badge badge-lg border-none px-4 py-4 font-bold ${
                    status === "Currently Running"
                      ? "badge-success animate-pulse"
                      : "badge-warning"
                  }`}
                >
                  {status}
                </span>

                <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-black text-primary">
                  {remaining}
                </span>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-400">
                  Period {activeClass.periodId}
                </p>

                <h2 className="mt-1 text-3xl font-black leading-tight">
                  {activeClass.subject}
                </h2>
              </div>

              <div className="space-y-3">
                <InfoItem
                  icon={<FaDoorOpen />}
                  label="Class Room"
                  value={activeClass.room}
                />

                <InfoItem
                  icon={<FaUserTie />}
                  label="Faculty Name"
                  value={activeClass.faculty}
                />

                <InfoItem
                  icon={<FaClock />}
                  label="Class Time"
                  value={`${formatTime(activeClass.startTime)} - ${formatTime(
                    activeClass.endTime
                  )}`}
                />

                <InfoItem
                  icon={<FaBookOpen />}
                  label="Subject"
                  value={activeClass.subject}
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-semibold text-gray-500">
                  <span>Time Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <progress
                  className="progress progress-primary h-3 w-full"
                  value={progress}
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-2xl font-black">{status}</h2>
            <p className="mt-2 text-gray-500">Enjoy your free time.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="group/item flex items-center gap-3 rounded-2xl bg-base-200 p-3 transition-all duration-300 hover:translate-x-1 hover:bg-primary/10">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition-all duration-300 group-hover/item:rotate-6 group-hover/item:scale-110">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}

function convertToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getProgress(cls, currentTime, status) {
  if (!cls || !currentTime) return 0;

  if (status === "Upcoming Class") return 100;

  const now = currentTime.getHours() * 60 + currentTime.getMinutes();
  const start = convertToMinutes(cls.startTime);
  const end = convertToMinutes(cls.endTime);
  const duration = end - start;
  const completed = now - start;

  return Math.min(Math.max((completed / duration) * 100, 0), 100);
}

function getRemainingTime(cls, currentTime, status) {
  if (!cls || !currentTime) return "";

  const now = currentTime.getHours() * 60 + currentTime.getMinutes();
  const start = convertToMinutes(cls.startTime);
  const end = convertToMinutes(cls.endTime);

  if (status === "Upcoming Class") {
    return `${start - now} min to start`;
  }

  return `${end - now} min left`;
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  return date.toLocaleTimeString("en-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}