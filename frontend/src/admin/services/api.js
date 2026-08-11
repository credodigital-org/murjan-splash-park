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

// If a request comes back 401 (bad/expired token), log the user out
// and send them back to the login screen.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("murjan_admin_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
