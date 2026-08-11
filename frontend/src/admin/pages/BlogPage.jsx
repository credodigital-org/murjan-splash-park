import ResourceListPage from "../components/ResourceListPage";
import blogService from "../services/blogService";

export default function BlogPage() {
  return (
    <ResourceListPage
      title="Blog"
      service={blogService}
      addLabel="New Post"
      columns={[
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "featured", label: "Featured", render: (i) => (i.featured ? "Yes" : "") },
        { key: "published_at", label: "Published" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "excerpt", label: "Excerpt (shown on listing cards)", type: "textarea" },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "featured_image", label: "Featured Image", type: "file" },
        { name: "meta_title", label: "SEO Title", type: "text" },
        { name: "meta_description", label: "SEO Description", type: "textarea" },
        { name: "status", label: "Status", type: "select", options: [
          { value: "draft", label: "Draft" }, { value: "published", label: "Published" },
        ]},
        { name: "featured", label: "Show in Homepage Featured Section", type: "checkbox" },
      ]}
    />
  );
}
