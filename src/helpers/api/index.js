import axios from "axios";
import { BASE } from "../urls";
import { Service } from "axios-middleware";
import store from "src/store";

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

api.interceptors.response.use(
  function (resp) {
    return resp.data;
  },
  function (e) {
    if (e.response.status === 401) {
      store.dispatch({ type: "LOG_OUT" });
    }
  }
);

api.interceptors.request.use(function (req) {
  var state = store.getState();
  req.headers["x-access-token"] =
    req.headers["x-access-token"] || state.user?.token;
  return req;
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
