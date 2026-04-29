import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base-200 pb-24 md:pb-0">
      <Navbar></Navbar>

      <main>
        <Outlet />
      </main>
    </div>
  );
}