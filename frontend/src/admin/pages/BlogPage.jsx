import ResourceListPage from "../components/ResourceListPage";
import blogService from "../services/blogService";

export default function BlogPage() {
  return (
    <ResourceListPage
      title="Blog"
      service={blogService}
      addLabel="New Post"

      columns={[
        {
          key: "title",
          label: "Title",
        },

        {
          key: "status",
          label: "Status",
          render: (item) => item.status || "Draft",
        },

        {
          key: "published_at",
          label: "Published",
          render: (item) =>
            item.published_at
              ? new Date(item.published_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Not published",
        },
      ]}

      fields={[
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },

        {
          name: "content",
          label: "Content",
          type: "textarea",
          required: true,
        },

        {
          name: "featured_image",
          label: "Featured Image",
          type: "file",
        },

        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            {
              value: "draft",
              label: "Draft",
            },
            {
              value: "published",
              label: "Published",
            },
          ],
        },
      ]}
    />
  );
}