import api from "../../services/api";
import { toRequestBody } from "./resourceService";

export default {
  get: () => api.get("/settings/").then((res) => res.data),
  update: (data) => api.patch("/settings/", toRequestBody(data)).then((res) => res.data),
};
