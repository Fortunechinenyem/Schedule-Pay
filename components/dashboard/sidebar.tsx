import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCalendar, FiSettings, FiDollarSign } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
    { name: "Payments", href: "/dashboard/payments", icon: <FiDollarSign /> },
    { name: "Schedule", href: "/dashboard/schedule", icon: <FiCalendar /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4">
      <div className="mb-8 p-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          SchedulePay
        </h1>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === item.href
                ? "bg-gray-800 text-cyan-400"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
