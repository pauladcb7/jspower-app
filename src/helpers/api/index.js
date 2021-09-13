import axios from "axios";
import { BASE } from "../urls";
import { Service } from "axios-middleware";

const authHeader = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
      "Access-Control-Allow-Origin": "*",
    };
  }
};

export const api = axios.create({
  baseURL: BASE,
  headers: authHeader(),
});

api.interceptors.response.use(function (resp) {
  return resp.data;
});

const service = new Service(api);

service.register({
  onResponse(resp) {
    /* const {
      data: { data },
    } = resp; */
    return resp;
  },
});