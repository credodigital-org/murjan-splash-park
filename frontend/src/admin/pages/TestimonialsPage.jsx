import ResourceListPage from "../components/ResourceListPage";
import testimonialsService from "../services/testimonialsService";

export default function TestimonialsPage() {
  return (
    <ResourceListPage
      title="Testimonials"
      service={testimonialsService}
      addLabel="Add Testimonial"
      columns={[
        { key: "guest_name", label: "Guest" },
        { key: "location", label: "Location" },
        { key: "rating", label: "Rating" },
      ]}
      fields={[
        { name: "guest_name", label: "Guest Name", type: "text", required: true },
        { name: "location", label: "Location", type: "text" },
        { name: "quote", label: "Quote", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
