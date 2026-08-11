import api from "../../services/api";
import { toRequestBody } from "./resourceService";

export default {
  get: () => api.get("/settings/hero/").then((res) => res.data),
  update: (data) => api.patch("/settings/hero/", toRequestBody(data)).then((res) => res.data),
};
