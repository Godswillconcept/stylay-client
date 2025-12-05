import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="text-text-primary min-h-screen bg-gray-100 font-sans">
      <div className="flex">
        <AdminSideBar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminHeader />
          <main className="mx-auto w-full max-w-[1120px] p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
