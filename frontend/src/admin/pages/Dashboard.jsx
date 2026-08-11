import { useEffect, useState } from "react";
import galleryService from "../services/galleryService";
import blogService from "../services/blogService";
import contactService from "../services/contactService";
import ticketsService from "../services/ticketsService";

export default function Dashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    Promise.all([
      galleryService.list(),
      blogService.list(),
      contactService.list(),
      ticketsService.list(),
    ]).then(([gallery, blog, contact, tickets]) => {
      setCounts({
        gallery: gallery.length,
        blog: blog.length,
        unreadMessages: contact.filter((m) => !m.is_read).length,
        totalMessages: contact.length,
        tickets: tickets.length,
      });
    }).catch(() => setCounts(false));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {counts === null && <p>Loading...</p>}
      {counts === false && <p className="error-text">Could not load dashboard data.</p>}
      {counts && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          <div className="card">
            <div className="hint-text">Gallery Images</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.gallery}</div>
          </div>
          <div className="card">
            <div className="hint-text">Blog Posts</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.blog}</div>
          </div>
          <div className="card">
            <div className="hint-text">Ticket Types</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.tickets}</div>
          </div>
          <div className="card">
            <div className="hint-text">Unread Messages</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: counts.unreadMessages > 0 ? "#B00020" : "inherit" }}>
              {counts.unreadMessages} <span style={{ fontSize: "1rem", color: "#6B7280" }}>/ {counts.totalMessages}</span>
            </div>
          </div>
        </div>
      )}
      <p className="hint-text" style={{ marginTop: "1.5rem" }}>
        Reminder: ticket prices shown on the website are for display only —
        update Wix separately if a price changes.
      </p>
    </div>
  );
}
