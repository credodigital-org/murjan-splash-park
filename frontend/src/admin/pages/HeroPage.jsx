import { useEffect, useState } from "react";
import heroService from "../services/heroService";
import ResourceForm from "../components/ResourceForm";

export default function HeroPage() {
  const [values, setValues] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    heroService.get().then(setValues);
  }, []);

  const handleSubmit = async (data) => {
    const updated = await heroService.update(data);
    setValues(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!values) return <p>Loading...</p>;

  return (
    <div>
      <h1>Homepage Hero</h1>
      {saved && <div className="badge badge-success" style={{ marginBottom: "1rem" }}>Saved</div>}
      <div className="card">
        <ResourceForm
          initialValues={values}
          onSubmit={handleSubmit}
          submitLabel="Save Hero Section"
          fields={[
            { name: "headline", label: "Headline", type: "text", required: true },
            { name: "subheadline", label: "Subheadline", type: "text" },
            { name: "background_image", label: "Background Image", type: "file" },
            { name: "cta_text", label: "Button Text", type: "text" },
          ]}
        />
      </div>
    </div>
  );
}
