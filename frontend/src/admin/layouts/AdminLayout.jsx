import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../admin.css";

const NAV_ITEMS = [
  {
    to: "/admin",
    label: "Dashboard",
    end: true,
  },
  // {
  //   to: "/admin/overview",
  //   label: "Website Overview",
  // },
  {
    to: "/admin/gallery",
    label: "Gallery",
  },
  {
    to: "/admin/blog",
    label: "Blog Posts",
  },
  {
    to: "/admin/working-hours",
    label: "Working Hours",
  },
  {
    to: "/admin/testimonials",
    label: "Testimonials",
  },
  // {
  //   to: "/admin/announcements",
  //   label: "Announcements",
  // },
  // {
  //   to: "/admin/gallery-management",
  //   label: "Gallery Management",
  // },
];

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="murjan-admin">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            Murjan Admin
          </div>

          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                "admin-sidebar-link" +
                (isActive ? " active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div
            className="admin-sidebar-logout"
            onClick={logout}
          >
            Logout
          </div>
        </aside>

        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}