import { useState } from "react";
import { Home, Settings, BarChart2, Bell, Menu } from "lucide-react";

function Dashboard() {
  const [activePage, setActivePage] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <button
        className="absolute top-4 left-4 md:hidden text-white bg-blue-600 p-2 rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed md:relative w-60 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6 flex flex-col space-y-6 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => {
              setActivePage("Home");
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <Home size={22} /> <span>Home</span>
          </button>
          <button
            onClick={() => {
              setActivePage("Analytics");
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <BarChart2 size={22} /> <span>Analytics</span>
          </button>
          <button
            onClick={() => {
              setActivePage("Notifications");
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <Bell size={22} /> <span>Notifications</span>
          </button>
          <button
            onClick={() => {
              setActivePage("Settings");
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <Settings size={22} /> <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8 md:ml-60">
        <h1 className="text-3xl font-semibold text-gray-800 border-b pb-4">
          {activePage}
        </h1>

        {activePage === "Home" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Welcome to Dashboard</h2>
              <p className="text-gray-600"></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Dashboard Programmer</h2>
              <p className="text-gray-600"> </p>
            </div>
          </div>
        )}

        {activePage === "Analytics" && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}

        {activePage === "Notifications" && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
            <p className="text-gray-600">No new notifications</p>
          </div>
        )}

        {activePage === "Settings" && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-gray-600">Manage your preferences here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
