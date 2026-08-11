import ResourceListPage from "../components/ResourceListPage";
import pagesService from "../services/pagesService";

export default function PagesContentPage() {
  return (
    <ResourceListPage
      title="Content Pages"
      service={pagesService}
      addLabel="New Page"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "URL Slug" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "URL Slug (e.g. 'about', 'faq')", type: "text", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "featured_image", label: "Featured Image", type: "file" },
        { name: "meta_title", label: "SEO Title", type: "text" },
        { name: "meta_description", label: "SEO Description", type: "textarea" },
      ]}
    />
  );
}
