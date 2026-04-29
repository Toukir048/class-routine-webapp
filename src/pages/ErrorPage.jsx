import { Link } from "react-router";
import { TbError404 } from "react-icons/tb";
import { FaHome, FaGhost } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 px-5 py-10">
      <section className="relative max-w-sm text-center">
        <div className="absolute -left-10 -top-10 text-5xl text-primary/30 animate-bounce">
          <FaGhost />
        </div>

        <div className="absolute -right-8 top-20 text-4xl text-secondary/40 animate-pulse">
          <FaGhost />
        </div>

        <div className="rounded-[2rem] bg-base-100 p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="mx-auto mb-5 flex h-28 w-28 animate-bounce items-center justify-center rounded-full bg-error text-6xl text-error-content shadow-lg">
            <TbError404 />
          </div>

          <h1 className="text-5xl font-black text-error">Oops!</h1>

          <h2 className="mt-3 text-2xl font-bold">
            This page skipped class 😅
          </h2>

          <p className="mt-3 text-gray-500">
            Looks like this route is absent today. Maybe it forgot the routine.
          </p>

          <Link
            to="/"
            className="btn btn-primary mt-7 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}