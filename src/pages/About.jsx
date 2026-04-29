import {
  FaGithub,
  FaReact,
  FaCode,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-8">
      <section className="mx-auto max-w-sm">
        <div className="rounded-[2rem] bg-base-100 p-5 text-center shadow-2xl">
          <img
            src="/author.png"
            alt="Toukir Sarder"
            className="mx-auto h-32 w-32 rounded-full border-4 border-primary object-cover shadow-xl"
          />

          <h1 className="mt-4 text-3xl font-black">Toukir Sarder</h1>

          <p className="mt-2 text-sm text-gray-500">
            Aspiring Software Developer | Frontend Developer | Learning React.js
          </p>

          <a
            href="https://github.com/Toukir048"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-5 rounded-2xl"
          >
            <FaGithub />
            GitHub Profile
          </a>
        </div>

        <div className="mt-6 space-y-4">
          <InfoCard
            icon={<FaClock />}
            title="About This App"
            text="This Class Routine App is designed for students to quickly check their current and upcoming classes. It uses live internet time to detect the active class, show remaining minutes, and display class details in a mobile-friendly interface."
          />

          <InfoCard
            icon={<FaReact />}
            title="Technology Used"
            text="The app is built with React, React Router, Tailwind CSS, DaisyUI, and React Icons. The design focuses on smooth animation, clean UI, responsive layout, and simple user experience."
          />

          <InfoCard
            icon={<FaCode />}
            title="Developer Focus"
            text="Toukir Sarder is currently learning React.js, Next.js, and Django, with interest in frontend development, DSA, competitive programming, and full-stack development."
          />

          <InfoCard
            icon={<FaUserGraduate />}
            title="Developer Details"
            text="GitHub profile shows 30 repositories, projects in JavaScript, React, HTML, C++, and learning-focused works like job tracker, digital tools app, byte visualizer, and Codeforces challenge."
          />
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl text-primary-content shadow-md">
        {icon}
      </div>

      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
    </div>
  );
}