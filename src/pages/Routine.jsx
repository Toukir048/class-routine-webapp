import { useEffect, useState } from "react";
import routineData from "../data/data.json";
import {
  FaBookOpen,
  FaClock,
  FaDoorOpen,
  FaUserTie,
  FaCalendarDay,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

export default function Routine() {
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [loading, setLoading] = useState(true);

  const routine = routineData.routine;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const days = ["All", ...routine.map((item) => item.day)];

  const filteredRoutine = routine
    .filter((dayItem) => selectedDay === "All" || dayItem.day === selectedDay)
    .map((dayItem) => ({
      ...dayItem,
      classes: dayItem.classes.filter(
        (cls) =>
          cls.subject.toLowerCase().includes(search.toLowerCase()) ||
          cls.faculty.toLowerCase().includes(search.toLowerCase()) ||
          cls.room.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((dayItem) => dayItem.classes.length > 0);

  if (loading) {
    return <RoutineLoader />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-6 text-white">
      <section className="mx-auto max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-indigo-500 text-2xl shadow-lg shadow-indigo-500/40">
            <FaCalendarDay />
          </div>

          <h1 className="text-3xl font-black">Weekly Routine</h1>
          <p className="mt-2 text-sm text-slate-300">
            Search and filter your class schedule by date
          </p>
        </div>

        <div className="sticky top-20 z-40 mb-6 rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <div className="relative mb-3">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search subject, faculty, or room..."
              className="input input-bordered w-full rounded-2xl border-white/10 bg-slate-950/70 pl-11 text-white placeholder:text-slate-400 focus:border-indigo-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400" />

            <select
              className="select select-bordered w-full rounded-2xl border-white/10 bg-slate-950/70 pl-11 text-white focus:border-indigo-400"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day === "All" ? "All Dates" : day}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredRoutine.length > 0 ? (
            filteredRoutine.map((dayItem) => (
              <DayCard key={dayItem.day} dayItem={dayItem} />
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center shadow-xl backdrop-blur-xl">
              <h2 className="text-xl font-black">No Class Found</h2>
              <p className="mt-2 text-sm text-slate-300">
                Try another date, subject, faculty, or room number.
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
        <h2 className="text-2xl font-black">{dayItem.day}</h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-200">
          {dayItem.classes.length} Classes
        </span>
      </div>

      <div className="space-y-4">
        {dayItem.classes.map((cls) => (
          <ClassCard key={`${dayItem.day}-${cls.periodId}`} cls={cls} />
        ))}
      </div>
    </div>
  );
}

function ClassCard({ cls }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/60 hover:bg-slate-900">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400"></div>

      <div className="mb-3 flex items-center justify-between gap-3">
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

function RoutineLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 text-white">
      <div className="relative text-center">
        <div className="absolute -left-16 -top-16 h-32 w-32 animate-ping rounded-full bg-indigo-500/20"></div>
        <div className="absolute -bottom-16 -right-16 h-32 w-32 animate-ping rounded-full bg-purple-500/20"></div>

        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 animate-spin rounded-[2rem] border-4 border-transparent border-r-purple-400 border-t-indigo-400"></div>

          <div className="flex h-20 w-20 animate-bounce items-center justify-center rounded-3xl bg-indigo-500 text-3xl shadow-lg shadow-indigo-500/40">
            <FaCalendarDay />
          </div>
        </div>

        <h1 className="text-3xl font-black">Loading Routine</h1>
        <p className="mt-2 text-sm text-slate-300">
          Preparing your weekly class schedule...
        </p>

        <div className="mx-auto mt-6 flex w-44 justify-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-indigo-400"></span>
          <span className="h-3 w-3 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]"></span>
          <span className="h-3 w-3 animate-bounce rounded-full bg-pink-400 [animation-delay:300ms]"></span>
        </div>
      </div>
    </main>
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