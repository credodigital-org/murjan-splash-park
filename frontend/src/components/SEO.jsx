import { useEffect, useState } from 'react';
import { getPageSEO } from '../services/settingsService';

/**
 * Fetches per-page SEO data from the existing PageSEO API
 * (/api/v1/settings/seo/{pageSlug}/) and renders <title>/<meta> tags
 * directly in the tree. React 19 natively hoists <title>, <meta>, and
 * <link> tags into <head> regardless of where they're rendered — no
 * external library (react-helmet etc.) is needed or compatible with
 * React 19 yet, so this is the correct approach for this project.
 *
 * Falls back to defaultTitle/defaultDescription if no PageSEO entry
 * exists yet for this slug, or if the request fails.
 */
export default function SEO({ pageSlug, defaultTitle, defaultDescription }) {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    if (!pageSlug) return;
    getPageSEO(pageSlug).then(setSeo).catch(() => {});
  }, [pageSlug]);

  const title = seo?.meta_title || defaultTitle || 'Murjan Splash Park';
  const description = seo?.meta_description || defaultDescription || "Abu Dhabi's premier family water park.";
  const image = seo?.og_image;
  const canonicalUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </>
  );
}
