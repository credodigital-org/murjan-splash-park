import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../admin.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/hero", label: "Hero Section" },
  { to: "/admin/pages", label: "Pages" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/tickets", label: "Tickets" },
  { to: "/admin/working-hours", label: "Working Hours" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/features", label: "Why Murjan Features" },
  { to: "/admin/announcements", label: "Announcements" },
  { to: "/admin/settings", label: "Settings" },
  { to: "/admin/contact", label: "Contact Messages" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  return (
    <div className="murjan-admin">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">Murjan Admin</div>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "admin-sidebar-link" + (isActive ? " active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="admin-sidebar-logout" onClick={logout}>Logout</div>
        </aside>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
