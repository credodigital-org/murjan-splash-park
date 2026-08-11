import { useEffect, useState } from "react";
import settingsService from "../services/settingsService";
import ResourceForm from "../components/ResourceForm";

export default function SettingsPage() {
  const [values, setValues] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsService.get().then(setValues);
  }, []);

  const handleSubmit = async (data) => {
    const updated = await settingsService.update(data);
    setValues(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!values) return <p>Loading...</p>;

  return (
    <div>
      <h1>Site Settings</h1>
      {saved && <div className="badge badge-success" style={{ marginBottom: "1rem" }}>Saved</div>}
      <div className="card">
        <ResourceForm
          initialValues={values}
          onSubmit={handleSubmit}
          submitLabel="Save Settings"
          fields={[
            { name: "site_name", label: "Site Name", type: "text" },
            { name: "phone", label: "Phone", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "address", label: "Address", type: "textarea" },
            { name: "google_maps_embed_url", label: "Google Maps Embed URL", type: "url" },
            { name: "instagram_url", label: "Instagram URL", type: "url" },
            { name: "facebook_url", label: "Facebook URL", type: "url" },
            { name: "twitter_url", label: "Twitter URL", type: "url" },
            { name: "whatsapp_number", label: "WhatsApp Number", type: "text" },
            { name: "footer_text", label: "Footer Text", type: "textarea" },
            { name: "copyright_text", label: "Copyright Text", type: "text" },
            { name: "booking_redirect_url", label: "Booking Redirect URL (Wix)", type: "url", required: true },
            { name: "default_meta_title", label: "Default SEO Title", type: "text" },
            { name: "default_meta_description", label: "Default SEO Description", type: "textarea" },
          ]}
        />
      </div>
      <p className="hint-text">
        "Booking Redirect URL" controls where every "Book Tickets" button on the
        website sends visitors. Changing it here updates the whole site immediately.
      </p>
    </div>
  );
}
