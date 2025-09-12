// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // manda cookies
  headers: { "Content-Type": "application/json" },
});

// lee cookie (para CSRF)
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// token en memoria (no lo persistimos)
let accessToken = null;

export const setAccessToken = (t) => { accessToken = t; };

// agrega Bearer si existe
api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// refresco automático ante 401
let refreshing = null;
api.interceptors.response.use(
  r => r,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // refresh protegido por CSRF
        const csrf = getCookie("csrftoken");
        if (!refreshing) {
          refreshing = api.post("/auth/refresh/", {}, {
            headers: { "X-CSRFToken": csrf }
          }).then(res => {
            setAccessToken(res.data.access);
            return res;
          }).finally(() => refreshing = null);
        }
        await refreshing;
        return api(original);
      } catch (e) {
        setAccessToken(null);
      }
    }
    return Promise.reject(err);
  }
);

// helpers
export async function primeCSRF() {
  await api.get("/auth/csrf/"); // setea csrftoken
}
export async function login(username, password) {
  const { data } = await api.post("/auth/login/", { username, password });
  setAccessToken(data.access);
}
export async function me() {
  const { data } = await api.get("/auth/me/");
  return data;
}
export async function logout() {
  const csrf = getCookie("csrftoken");
  await api.post("/auth/logout/", {}, { headers: { "X-CSRFToken": csrf } });
  setAccessToken(null);
}
