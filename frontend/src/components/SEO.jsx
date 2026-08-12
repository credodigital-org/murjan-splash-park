import { useEffect } from "react";

export default function SEO({
  title,
  description,
  defaultTitle = "Murjan Splash Park",
  defaultDescription = "Murjan Splash Park Abu Dhabi",
}) {
  useEffect(() => {
    const finalTitle = title || defaultTitle;
    const finalDescription =
      description || defaultDescription;

    document.title = finalTitle;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute(
        "name",
        "description"
      );
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      finalDescription
    );
  }, [
    title,
    description,
    defaultTitle,
    defaultDescription,
  ]);

  return null;
}