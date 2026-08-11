import api from "../../services/api";

export const login = (username, password) =>
  api.post("/auth/token/", { username, password }).then((res) => res.data.token);
