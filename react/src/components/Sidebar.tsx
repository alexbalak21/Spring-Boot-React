import { Link, useLocation } from "react-router-dom";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sidebarLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Update Profile", href: "/update-profile" },
  { name: "Update Password", href: "/update-password" },
];

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>
        <nav className="space-y-2">
          {sidebarLinks.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                isActive(item.href)
                  ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                "block px-3 py-2 rounded-md text-sm font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
