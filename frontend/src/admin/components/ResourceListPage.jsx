import { useEffect, useState } from "react";
import Modal from "./Modal";
import ResourceForm from "./ResourceForm";

/**
 * Generic list + create/edit/delete page for a resource service.
 * Every simple CRUD admin screen (Gallery, Blog, Tickets, Pages, etc.)
 * is just this component with different `columns`/`fields` config —
 * avoids rewriting the same list/modal/delete logic 10 times.
 */
export default function ResourceListPage({
  title,
  service,
  columns,       // [{ key, label, render? }]
  fields,        // field config for ResourceForm
  idField = "id",
  addLabel = "Add New",
}) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = editing existing
  const lookupField = service.lookupField || idField;

  const load = async () => {
    try {
      const data = await service.list();
      setItems(data);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: fetch once on mount only
  }, []);

  const handleSubmit = async (values) => {
    if (editing[lookupField] !== undefined) {
      await service.update(editing[lookupField], values);
    } else {
      await service.create(values);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item[columns[0].key]}"? This can't be undone.`)) return;
    await service.remove(item[lookupField]);
    load();
  };

  if (error) return <p className="error-text">Could not load {title}. Is the backend running?</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{title}</h1>
        <button className="btn btn-gold" onClick={() => setEditing({})}>+ {addLabel}</button>
      </div>

      {!items ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#6B7280" }}>Nothing here yet. Click "{addLabel}" to create the first one.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item[lookupField]}>
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(item) : String(item[c.key] ?? "")}</td>
                ))}
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditing(item)}>Edit</button>{" "}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <Modal title={editing[lookupField] !== undefined ? "Edit" : addLabel} onClose={() => setEditing(null)}>
          <ResourceForm
            fields={fields}
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}
