import { FaEnvelope, FaPhoneAlt, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-indigo-500 text-2xl shadow-lg shadow-indigo-500/40">
            <FaPaperPlane />
          </div>

          <h1 className="text-3xl font-black">Contact Developer</h1>
          <p className="mt-2 text-sm text-slate-300">
            Need help or want to connect? Reach out anytime.
          </p>
        </div>

        <div className="space-y-4">
          <ContactCard
            icon={<FaEnvelope />}
            title="Email"
            value="toukir.ugv@gmail.com"
            link="mailto:toukir.ugv@gmail.com"
          />

          <ContactCard
            icon={<FaPhoneAlt />}
            title="Phone"
            value="01794203048"
            link="tel:01794203048"
          />

          <ContactCard
            icon={<FaGithub />}
            title="GitHub"
            value="github.com/Toukir048"
            link="https://github.com/Toukir048"
          />
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, value, link }) {
  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400/60 hover:bg-white/15"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-xl text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="font-bold text-white">{value}</p>
      </div>
    </a>
  );
}