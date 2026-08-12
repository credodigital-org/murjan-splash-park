import { useEffect, useState } from "react";
import workingHoursService from "../services/workingHoursService";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri"];
const WEEKEND = ["sat", "sun"];

const EMPTY_GROUP = {
  label: "",
  rows: [],
  opening_time: "",
  closing_time: "",
};

export default function WorkingHoursPage() {
  const [groups, setGroups] = useState({
    weekdays: {
      ...EMPTY_GROUP,
      label: "Monday - Friday",
    },
    weekend: {
      ...EMPTY_GROUP,
      label: "Saturday - Sunday",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState(null);

  // --------------------------------------------------
  // Load working hours
  // --------------------------------------------------

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await workingHoursService.list();

      console.log("Working Hours Data:", data);

      // -----------------------------------------------
      // Monday - Friday
      // -----------------------------------------------

      const weekdayRows = WEEKDAYS
        .map((day) => data.find((row) => row.day === day))
        .filter(Boolean);

      // -----------------------------------------------
      // Saturday - Sunday
      // -----------------------------------------------

      const weekendRows = WEEKEND
        .map((day) => data.find((row) => row.day === day))
        .filter(Boolean);

      // -----------------------------------------------
      // Use Monday as the displayed value for
      // Monday-Friday.
      // -----------------------------------------------

      const weekdaySource = weekdayRows[0];

      // -----------------------------------------------
      // Use Saturday as the displayed value for
      // Saturday-Sunday.
      // -----------------------------------------------

      const weekendSource = weekendRows[0];

      setGroups({
        weekdays: {
          label: "Monday - Friday",
          rows: weekdayRows,
          opening_time:
            weekdaySource?.opening_time?.slice(0, 5) || "",
          closing_time:
            weekdaySource?.closing_time?.slice(0, 5) || "",
        },

        weekend: {
          label: "Saturday - Sunday",
          rows: weekendRows,
          opening_time:
            weekendSource?.opening_time?.slice(0, 5) || "",
          closing_time:
            weekendSource?.closing_time?.slice(0, 5) || "",
        },
      });
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

  // --------------------------------------------------
  // Change input
  // --------------------------------------------------

  const handleChange = (groupName, field, value) => {
    setGroups((previous) => ({
      ...previous,

      [groupName]: {
        ...previous[groupName],
        [field]: value,
      },
    }));
  };

  // --------------------------------------------------
  // Save group
  // --------------------------------------------------

  const handleSave = async (groupName) => {
    try {
      setSaving(groupName);

      const group = groups[groupName];

      if (!group.rows.length) {
        alert(`No working hour records found for ${group.label}.`);
        return;
      }

      const updateData = {
        opening_time: group.opening_time,
        closing_time: group.closing_time,
      };

      console.log(
        `Saving ${group.label}:`,
        group.rows.map((row) => ({
          id: row.id,
          day: row.day,
        })),
        updateData
      );

      /*
       * IMPORTANT:
       *
       * Monday-Friday:
       *   updates only mon, tue, wed, thu, fri
       *
       * Saturday-Sunday:
       *   updates only sat, sun
       *
       * There is NO request to the other group.
       */

      await Promise.all(
        group.rows.map((row) =>
          workingHoursService.update(row.id, updateData)
        )
      );

      // Reload the actual values from the backend.
      await load();

      alert(`${group.label} updated successfully.`);
    } catch (err) {
      console.error("Failed to save working hours:", err);
      alert("Failed to save working hours. Please try again.");
    } finally {
      setSaving(null);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return <p>Loading working hours...</p>;
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <p style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div>
      <h1>Working Hours</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          marginTop: "1.5rem",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>DAY</th>
              <th style={headerStyle}>OPENING</th>
              <th style={headerStyle}>CLOSING</th>
              <th style={headerStyle}>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {/* -----------------------------------------
                Monday - Friday
            ----------------------------------------- */}

            <tr>
              <td style={cellStyle}>
                <strong>Monday - Friday</strong>
              </td>

              <td style={cellStyle}>
                <input
                  type="time"
                  value={groups.weekdays.opening_time}
                  onChange={(event) =>
                    handleChange(
                      "weekdays",
                      "opening_time",
                      event.target.value
                    )
                  }
                  style={timeInputStyle}
                />
              </td>

              <td style={cellStyle}>
                <input
                  type="time"
                  value={groups.weekdays.closing_time}
                  onChange={(event) =>
                    handleChange(
                      "weekdays",
                      "closing_time",
                      event.target.value
                    )
                  }
                  style={timeInputStyle}
                />
              </td>

              <td style={cellStyle}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSave("weekdays")}
                  disabled={
                    saving === "weekdays" ||
                    groups.weekdays.rows.length !== 5
                  }
                >
                  {saving === "weekdays"
                    ? "Saving..."
                    : "Save"}
                </button>
              </td>
            </tr>

            {/* -----------------------------------------
                Saturday - Sunday
            ----------------------------------------- */}

            <tr>
              <td style={cellStyle}>
                <strong>Saturday - Sunday</strong>
              </td>

              <td style={cellStyle}>
                <input
                  type="time"
                  value={groups.weekend.opening_time}
                  onChange={(event) =>
                    handleChange(
                      "weekend",
                      "opening_time",
                      event.target.value
                    )
                  }
                  style={timeInputStyle}
                />
              </td>

              <td style={cellStyle}>
                <input
                  type="time"
                  value={groups.weekend.closing_time}
                  onChange={(event) =>
                    handleChange(
                      "weekend",
                      "closing_time",
                      event.target.value
                    )
                  }
                  style={timeInputStyle}
                />
              </td>

              <td style={cellStyle}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSave("weekend")}
                  disabled={
                    saving === "weekend" ||
                    groups.weekend.rows.length !== 2
                  }
                >
                  {saving === "weekend"
                    ? "Saving..."
                    : "Save"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Styles
// --------------------------------------------------

const headerStyle = {
  textAlign: "left",
  padding: "1rem",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#64748b",
  borderBottom: "1px solid #e5e7eb",
};

const cellStyle = {
  padding: "1rem",
  borderBottom: "1px solid #e5e7eb",
  verticalAlign: "middle",
};

const timeInputStyle = {
  padding: "0.55rem 0.7rem",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "0.95rem",
};