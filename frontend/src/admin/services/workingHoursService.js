import api from "../../services/api";

// NOTE: WorkingHoursViewSet uses the default pk (id) lookup, not "day" —
// the list response includes each row's id, use that for updates.
export default {
  list: () => api.get("/settings/working-hours/").then((res) => res.data.results ?? res.data),
  update: (id, data) => api.patch(`/settings/working-hours/${id}/`, data).then((res) => res.data),
};
