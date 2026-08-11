import ResourceListPage from "../components/ResourceListPage";
import featuresService from "../services/featuresService";

export default function FeaturesPage() {
  return (
    <ResourceListPage
      title='"Why Murjan" Features'
      service={featuresService}
      addLabel="Add Feature"
      columns={[
        { key: "title", label: "Title" },
        { key: "icon", label: "Icon" },
        { key: "display_order", label: "Order" },
      ]}
      fields={[
        { name: "icon", label: "Icon (emoji, used only if no image is set)", type: "text" },
        { name: "image", label: "Illustration Image (preferred — matches live site design)", type: "file" },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
