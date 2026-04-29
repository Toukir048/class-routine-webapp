import { useState } from "react";
import routineData from "../data/data.json";
import {
  FaBookOpen,
  FaClock,
  FaDoorOpen,
  FaUserTie,
  FaCalendarDay,
  FaSearch,
} from "react-icons/fa";

export default function Routine() {
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");

  const days = ["All", ...routineData.routine.map((item) => item.day)];

  const filteredRoutine = routineData.routine
    .filter((dayItem) => selectedDay === "All" || dayItem.day === selectedDay)
    .map((dayItem) => ({
      ...dayItem,
      classes: dayItem.classes.filter(
        (cls) =>
          cls.subject.toLowerCase().includes(search.toLowerCase()) ||
          cls.faculty.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((dayItem) => dayItem.classes.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-6 text-white">
      <section className="mx-auto max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-indigo-500 text-2xl shadow-lg shadow-indigo-500/40">
            <FaCalendarDay />
          </div>

          <h1 className="text-3xl font-black">Weekly Routine</h1>
          <p className="mt-2 text-sm text-slate-300">
            Filter classes by day, subject, or faculty name
          </p>
        </div>

        <div className="sticky top-20 z-40 mb-6 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <div className="relative mb-3">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by subject or faculty..."
              className="input input-bordered w-full rounded-2xl bg-slate-950/70 pl-11 text-white placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="select select-bordered w-full rounded-2xl bg-slate-950/70 text-white"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day === "All" ? "All Days" : day}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredRoutine.length > 0 ? (
            filteredRoutine.map((dayItem, index) => (
              <DayCard key={index} dayItem={dayItem} />
            ))
          ) : (
            <div className="rounded-3xl bg-white/10 p-6 text-center shadow-xl">
              <h2 className="text-xl font-black">No Class Found</h2>
              <p className="mt-2 text-sm text-slate-300">
                Try another day, subject, or faculty name.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DayCard({ dayItem }) {
  return (
    <div className="group rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-indigo-500/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">{dayItem.day}</h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-200">
          {dayItem.classes.length} Classes
        </span>
      </div>

      <div className="space-y-4">
        {dayItem.classes.map((cls) => (
          <ClassCard key={cls.periodId} cls={cls} />
        ))}
      </div>
    </div>
  );
}

function ClassCard({ cls }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/60 hover:bg-slate-900">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400"></div>

      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white shadow-md shadow-indigo-500/30">
          Period {cls.periodId}
        </span>

        <span className="flex items-center gap-1 text-xs font-semibold text-slate-300">
          <FaClock className="text-indigo-300" />
          {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
        </span>
      </div>

      <h3 className="mb-4 text-xl font-black text-white">{cls.subject}</h3>

      <div className="space-y-3">
        <InfoRow icon={<FaUserTie />} label="Faculty" value={cls.faculty} />
        <InfoRow icon={<FaDoorOpen />} label="Room" value={cls.room} />
        <InfoRow icon={<FaBookOpen />} label="Subject" value={cls.subject} />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 transition-all duration-300 hover:translate-x-1 hover:bg-indigo-500/10">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
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