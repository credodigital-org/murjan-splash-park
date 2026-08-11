import { useState } from "react";

/**
 * Generic form renderer driven by a field config array, so each admin
 * page only needs to declare its fields, not rewrite a form every time.
 *
 * field: { name, label, type: 'text'|'textarea'|'number'|'checkbox'|'file'|'select',
 *          options? (for select), required? }
 */
export default function ResourceForm({ fields, initialValues = {}, onSubmit, onCancel, submitLabel = "Save" }) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // File fields hold the existing image URL (a string) when untouched
      // during an edit — only send file fields if the user actually picked
      // a new file. Sending the old URL string back would fail validation.
      const payload = {};
      for (const [key, value] of Object.entries(values)) {
        const field = fields.find((f) => f.name === key);
        if (field?.type === "file" && !(value instanceof File)) continue;
        payload[key] = value;
      }
      await onSubmit(payload);
    } catch (err) {
      setError(err?.response?.data ? JSON.stringify(err.response.data) : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f) => (
        <div className="form-group" key={f.name}>
          <label>{f.label}{f.required ? " *" : ""}</label>
          {f.type === "textarea" && (
            <textarea
              value={values[f.name] ?? ""}
              required={f.required}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          )}
          {f.type === "checkbox" && (
            <input
              type="checkbox"
              checked={!!values[f.name]}
              onChange={(e) => handleChange(f.name, e.target.checked)}
            />
          )}
          {f.type === "file" && (
            <>
              <input type="file" accept="image/*" onChange={(e) => handleChange(f.name, e.target.files[0])} />
              {typeof values[f.name] === "string" && values[f.name] && (
                <div className="hint-text">Current: <a href={values[f.name]} target="_blank" rel="noreferrer">view image</a></div>
              )}
            </>
          )}
          {f.type === "select" && (
            <select value={values[f.name] ?? ""} onChange={(e) => handleChange(f.name, e.target.value)}>
              <option value="">-- Select --</option>
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
          {["text", "number", "email", "url", "date", "time"].includes(f.type) && (
            <input
              type={f.type}
              value={values[f.name] ?? ""}
              required={f.required}
              onChange={(e) => handleChange(f.name, f.type === "number" ? e.target.valueAsNumber || "" : e.target.value)}
            />
          )}
        </div>
      ))}
      {error && <div className="error-text">{error}</div>}
      <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.25rem" }}>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
