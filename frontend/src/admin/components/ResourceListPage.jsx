import { useEffect, useState } from "react";
import Modal from "./Modal";
import ResourceForm from "./ResourceForm";

/**
 * Generic list + create/edit/delete page for a resource service.
 *
 * Edit behavior:
 * - List endpoint loads lightweight records for the table.
 * - Clicking Edit fetches the complete record using service.get().
 * - This ensures fields such as Blog content are populated correctly.
 */
export default function ResourceListPage({
  title,
  service,
  columns,
  fields,
  idField = "id",
  addLabel = "Add New",
}) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const lookupField = service.lookupField || idField;

  const load = async () => {
    try {
      setError(null);

      const data = await service.list();
      setItems(data);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    load();

    // Fetch once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Open the create form.
   */
  const handleAdd = () => {
    setEditing({});
  };

  /**
   * Open the edit form.
   *
   * IMPORTANT:
   * Fetch the complete object instead of using the list item directly.
   * This is especially important for Blog content.
   */
  const handleEdit = async (item) => {
    const lookupValue = item[lookupField];

    if (lookupValue === undefined || lookupValue === null) {
      setEditing(item);
      return;
    }

    try {
      setLoadingEdit(true);
      setError(null);

      if (typeof service.get === "function") {
        const fullItem = await service.get(lookupValue);
        setEditing(fullItem);
      } else {
        // Fallback for services that don't provide get()
        setEditing(item);
      }
    } catch (err) {
      console.error("Failed to load record for editing:", err);

      // Keep the old behavior as a fallback.
      setEditing(item);
    } finally {
      setLoadingEdit(false);
    }
  };

  /**
   * Create / update.
   */
  const handleSubmit = async (values) => {
    try {
      if (editing[lookupField] !== undefined) {
        await service.update(editing[lookupField], values);
      } else {
        await service.create(values);
      }

      setEditing(null);
      await load();
    } catch (err) {
      // Let ResourceForm display the error.
      throw err;
    }
  };

  /**
   * Delete.
   */
  const handleDelete = async (item) => {
    if (
      !window.confirm(
        `Delete "${item[columns[0].key]}"? This can't be undone.`
      )
    ) {
      return;
    }

    try {
      await service.remove(item[lookupField]);
      await load();
    } catch {
      setError(true);
    }
  };

  if (error) {
    return (
      <p className="error-text">
        Could not load {title}. Is the backend running?
      </p>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{title}</h1>

        <button
          className="btn btn-gold"
          onClick={handleAdd}
          disabled={loadingEdit}
        >
          + {addLabel}
        </button>
      </div>

      {/* Loading */}
      {!items ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#6B7280" }}>
          Nothing here yet. Click "{addLabel}" to create the first one.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}

              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item[lookupField]}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.render
                      ? c.render(item)
                      : String(item[c.key] ?? "")}
                  </td>
                ))}

                <td
                  style={{
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleEdit(item)}
                    disabled={loadingEdit}
                  >
                    Edit
                  </button>{" "}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item)}
                    disabled={loadingEdit}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit / Create Modal */}
      {editing && (
        <Modal
          title={
            editing[lookupField] !== undefined
              ? "Edit"
              : addLabel
          }
          onClose={() => setEditing(null)}
        >
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