import api from "../../services/api";

/**
 * Generic CRUD helper for a standard DRF ViewSet endpoint.
 * basePath must include leading and trailing slashes, e.g. "/gallery/".
 */
export function makeResourceService(basePath, { lookupField = "id" } = {}) {
  return {
    list: (params) => api.get(basePath, { params }).then((res) => res.data.results ?? res.data),
    get: (id) => api.get(`${basePath}${id}/`).then((res) => res.data),
    create: (data) => api.post(basePath, toRequestBody(data)).then((res) => res.data),
    update: (id, data) =>
      api.patch(`${basePath}${id}/`, toRequestBody(data)).then((res) => res.data),
    remove: (id) => api.delete(`${basePath}${id}/`),
    lookupField,
  };
}

/**
 * Build a multipart FormData body if any field is a File, otherwise
 * send plain JSON. Handles image uploads (gallery, blog, hero, pages)
 * transparently without every page needing to know the difference.
 */
function toRequestBody(data) {
  const hasFile = Object.values(data).some((v) => v instanceof File);
  if (!hasFile) return data;

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) formData.append(key, value);
  });
  return formData;
}

export { toRequestBody };
