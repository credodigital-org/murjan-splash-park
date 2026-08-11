import api from "../../services/api";

export default {
  list: () => api.get("/contact/").then((res) => res.data.results ?? res.data),
  markRead: (id, isRead) => api.patch(`/contact/${id}/`, { is_read: isRead }).then((res) => res.data),
  remove: (id) => api.delete(`/contact/${id}/`),
};
