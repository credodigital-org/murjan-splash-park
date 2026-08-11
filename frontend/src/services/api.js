import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
});

// Attach the auth token to every request, if we're logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("murjan_admin_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// If an admin request comes back 401 (bad/expired token), log out and
// return to the admin login screen. Scoped to /admin/* paths only — this
// api.js is shared with the public site, and a public page should never
// be force-redirected just because some endpoint returned a 401.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && window.location.pathname.startsWith("/admin")) {
      localStorage.removeItem("murjan_admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
