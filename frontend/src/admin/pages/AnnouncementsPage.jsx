import ResourceListPage from "../components/ResourceListPage";
import announcementsService from "../services/announcementsService";

export default function AnnouncementsPage() {
  return (
    <ResourceListPage
      title="Announcements"
      service={announcementsService}
      addLabel="New Announcement"
      columns={[
        { key: "text", label: "Text" },
        { key: "expires_at", label: "Expires" },
      ]}
      fields={[
        { name: "text", label: "Banner Text", type: "textarea", required: true },
        { name: "cta_text", label: "Button Text", type: "text" },
        { name: "cta_url", label: "Button Link", type: "url" },
        { name: "expires_at", label: "Expires On", type: "date" },
      ]}
    />
  );
}
