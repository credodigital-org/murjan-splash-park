import { useEffect, useState } from "react";
import workingHoursService from "../services/workingHoursService";

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function WorkingHoursPage() {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState(null);

  // Load working hours
  // const load = async () => {
  //   try {
  //     setLoading(true);

  //     const data = await workingHoursService.list();

  //     const sorted = [...data].sort(
  //       (a, b) =>
  //         DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  //     );

  //     setHours(sorted);
  //     setError(null);
  //   } catch (err) {
  //     console.error("Failed to load working hours:", err);
  //     setError("Failed to load working hours.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const load = async () => {
  try {
    setLoading(true);

    const data = await workingHoursService.list();

    console.log("Working Hours Data:", data);

    const sorted = [...data].sort(
      (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
    );

    setHours(sorted);
    setError(null);
  } catch (err) {
    console.error("Failed to load working hours:", err);
    setError("Failed to load working hours.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    load();
  }, []);

  // Update local state
  const handleChange = (id, field, value) => {
    setHours((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  // Save one row
  const handleSave = async (row) => {
    try {
      setSaving(row.id);

      await workingHoursService.update(row.id, {
        opening_time: row.opening_time,
        closing_time: row.closing_time,
        is_closed: row.is_closed,
      });

      await load();
    } catch (err) {
      console.error("Failed to save working hours:", err);
      alert("Failed to save working hours.");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <p>Loading working hours...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Working Hours</h1>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Opening</th>
            <th>Closing</th>
            <th>Closed</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {hours.map((row) => (
            <tr key={row.id}>
              <td>{row.day_display}</td>

              <td>
                <input
                  type="time"
                  value={row.opening_time?.slice(0, 5) || ""}
                  onChange={(e) =>
                    handleChange(
                      row.id,
                      "opening_time",
                      e.target.value
                    )
                  }
                  disabled={row.is_closed}
                />
              </td>

              <td>
                <input
                  type="time"
                  value={row.closing_time?.slice(0, 5) || ""}
                  onChange={(e) =>
                    handleChange(
                      row.id,
                      "closing_time",
                      e.target.value
                    )
                  }
                  disabled={row.is_closed}
                />
              </td>

              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={row.is_closed}
                  onChange={(e) =>
                    handleChange(
                      row.id,
                      "is_closed",
                      e.target.checked
                    )
                  }
                />
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSave(row)}
                  disabled={saving === row.id}
                >
                  {saving === row.id ? "Saving..." : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}