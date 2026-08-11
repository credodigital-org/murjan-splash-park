import ResourceListPage from "../components/ResourceListPage";
import ticketsService from "../services/ticketsService";

export default function TicketsPage() {
  return (
    <div>
      <div className="card" style={{ background: "#FFF7E0", marginBottom: "1.25rem" }}>
        <strong>Reminder:</strong> these prices are shown on the website for reference only.
        The actual amount charged happens on Wix — update the price there too if it changes.
      </div>
      <ResourceListPage
        title="Ticket Pricing"
        service={ticketsService}
        addLabel="Add Ticket Type"
        columns={[
          { key: "name", label: "Name" },
          { key: "age_group", label: "Age Group" },
          { key: "price", label: "Price", render: (i) => `${i.currency} ${i.price}` },
          { key: "is_active", label: "Active", render: (i) => (i.is_active ? "Yes" : "No") },
        ]}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "age_group", label: "Age Group", type: "text" },
          { name: "description", label: "Description", type: "text" },
          { name: "price", label: "Price", type: "number", required: true },
          { name: "currency", label: "Currency", type: "text" },
          { name: "display_order", label: "Display Order", type: "number" },
          { name: "is_active", label: "Active", type: "checkbox" },
        ]}
      />
    </div>
  );
}
