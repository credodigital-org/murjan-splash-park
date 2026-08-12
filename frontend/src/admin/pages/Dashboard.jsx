// import { useEffect, useState } from "react";
// import galleryService from "../services/galleryService";
// import blogService from "../services/blogService";
// import contactService from "../services/contactService";
// import ticketsService from "../services/ticketsService";

// export default function Dashboard() {
//   const [counts, setCounts] = useState(null);

//   useEffect(() => {
//     Promise.all([
//       galleryService.list(),
//       blogService.list(),
//       contactService.list(),
//       ticketsService.list(),
//     ]).then(([gallery, blog, contact, tickets]) => {
//       setCounts({
//         gallery: gallery.length,
//         blog: blog.length,
//         unreadMessages: contact.filter((m) => !m.is_read).length,
//         totalMessages: contact.length,
//         tickets: tickets.length,
//       });
//     }).catch(() => setCounts(false));
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {counts === null && <p>Loading...</p>}
//       {counts === false && <p className="error-text">Could not load dashboard data.</p>}
//       {counts && (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
//           <div className="card">
//             <div className="hint-text">Gallery Images</div>
//             <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.gallery}</div>
//           </div>
//           <div className="card">
//             <div className="hint-text">Blog Posts</div>
//             <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.blog}</div>
//           </div>
//           <div className="card">
//             <div className="hint-text">Ticket Types</div>
//             <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{counts.tickets}</div>
//           </div>
//           <div className="card">
//             <div className="hint-text">Unread Messages</div>
//             <div style={{ fontSize: "1.8rem", fontWeight: 700, color: counts.unreadMessages > 0 ? "#B00020" : "inherit" }}>
//               {counts.unreadMessages} <span style={{ fontSize: "1rem", color: "#6B7280" }}>/ {counts.totalMessages}</span>
//             </div>
//           </div>
//         </div>
//       )}
//       <p className="hint-text" style={{ marginTop: "1.5rem" }}>
//         Reminder: ticket prices shown on the website are for display only —
//         update Wix separately if a price changes.
//       </p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

import galleryService from "../services/galleryService";
import blogService from "../services/blogService";
import testimonialsService from "../services/testimonialsService";
import announcementsService from "../services/announcementsService";
import workingHoursService from "../services/workingHoursService";


export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          gallery,
          blog,
          testimonials,
          announcements,
          workingHours,
        ] = await Promise.all([
          galleryService.list(),
          blogService.list(),
          testimonialsService.list(),
          announcementsService.list(),
          workingHoursService.list(),
        ]);

        setCounts({
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          blog: Array.isArray(blog) ? blog.length : 0,
          testimonials: Array.isArray(testimonials)
            ? testimonials.length
            : 0,
          announcements: Array.isArray(announcements)
            ? announcements.length
            : 0,
          workingHours: Array.isArray(workingHours)
            ? workingHours.length
            : 0,
        });
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError("Could not load dashboard data.");
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Loading */}
      {counts === null && !error && (
        <p className="hint-text">Loading website overview...</p>
      )}

      {/* Error */}
      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {/* Dashboard Cards */}
      {counts && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            {/* Gallery */}
            <div className="card">
              <div className="hint-text">
                Gallery Images
              </div>

              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                {counts.gallery}
              </div>
            </div>

            {/* Blog */}
            <div className="card">
              <div className="hint-text">
                Blog Posts
              </div>

              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                {counts.blog}
              </div>
            </div>

            {/* Working Hours */}
            <div className="card">
              <div className="hint-text">
                Working Hours
              </div>

              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                {counts.workingHours}
              </div>
            </div>

            {/* Testimonials */}
            <div className="card">
              <div className="hint-text">
                Testimonials
              </div>

              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                {counts.testimonials}
              </div>
            </div>

            {/* Announcements */}
            <div className="card">
              <div className="hint-text">
                Announcements
              </div>

              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                {counts.announcements}
              </div>
            </div>
          </div>

          {/* Website Overview */}
          <div
            className="card"
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "0.75rem",
              }}
            >
              Website Overview
            </h2>

            <p className="hint-text">
              Manage the main website content from the admin panel.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.75rem",
                marginTop: "1rem",
              }}
            >
              <div>
                <strong>Gallery</strong>
                <div className="hint-text">
                  Manage website gallery images.
                </div>
              </div>

              <div>
                <strong>Blog Posts</strong>
                <div className="hint-text">
                  Create and manage blog posts.
                </div>
              </div>

              <div>
                <strong>Working Hours</strong>
                <div className="hint-text">
                  Update the park's opening and closing hours.
                </div>
              </div>

              <div>
                <strong>Testimonials</strong>
                <div className="hint-text">
                  Manage customer testimonials.
                </div>
              </div>

              <div>
                <strong>Announcements</strong>
                <div className="hint-text">
                  Manage website announcements.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}