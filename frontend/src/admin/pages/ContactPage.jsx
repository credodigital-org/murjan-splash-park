import { useEffect, useState } from "react";
import contactService from "../services/contactService";

export default function ContactPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load contact messages
  const load = async () => {
    try {
      setLoading(true);
      const data = await contactService.list();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Toggle read/unread
  const toggleRead = async (msg) => {
    try {
      await contactService.markRead(msg.id, !msg.is_read);
      await load();
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  // Delete message
  const handleDelete = async (msg) => {
    if (!window.confirm(`Delete message from "${msg.name}"?`)) return;

    try {
      await contactService.remove(msg.id);
      await load();
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Contact Messages</h1>

      {messages.length === 0 ? (
        <p style={{ color: "#6B7280" }}>No messages yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.name}</strong>
                  <br />
                  <span className="hint-text">{m.email}</span>
                </td>

                <td>{m.subject}</td>

                <td style={{ maxWidth: "280px" }}>{m.message}</td>

                <td>
                  <span
                    className={
                      "badge " +
                      (m.is_read ? "badge-muted" : "badge-success")
                    }
                  >
                    {m.is_read ? "Read" : "New"}
                  </span>
                </td>

                <td style={{ whiteSpace: "nowrap" }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => toggleRead(m)}
                  >
                    Mark {m.is_read ? "Unread" : "Read"}
                  </button>{" "}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(m)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}