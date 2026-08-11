import ResourceListPage from "../components/ResourceListPage";
import galleryService from "../services/galleryService";

const CATEGORY_OPTIONS = [
  { value: "water_slides", label: "Water Slides" },
  { value: "lazy_river", label: "Lazy River" },
  { value: "kiddie_zone", label: "Kiddie Splash Zone" },
  { value: "dining", label: "Dining & Delights" },
  { value: "events", label: "Events" },
  { value: "general", label: "General" },
];

export default function GalleryPage() {
  return (
    <ResourceListPage
      title="Gallery"
      service={galleryService}
      addLabel="Add Photo"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "featured", label: "Featured", render: (i) => (i.featured ? "Yes" : "") },
        { key: "display_order", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "image", label: "Image", type: "file" },
        { name: "alt_text", label: "Alt Text (for SEO/accessibility)", type: "text" },
        { name: "caption", label: "Caption", type: "text" },
        { name: "category", label: "Category", type: "select", options: CATEGORY_OPTIONS },
        { name: "display_order", label: "Display Order", type: "number" },
        { name: "featured", label: "Also show as a card in the Home page's Attractions section (this photo will always appear on the Gallery page regardless of this setting)", type: "checkbox" },
        { name: "link_url", label: "Link To (e.g. /attractions) — only used for homepage preview cards", type: "text" },
      ]}
    />
  );
}
