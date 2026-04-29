import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}