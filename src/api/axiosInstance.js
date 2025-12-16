import axios from "axios";

const rawBase = import.meta.env.VITE_BASE_URL;

if (!rawBase) {
  throw new Error("VITE_BASE_URL no está definida en el build");
}

const baseURL = new URL("/api", rawBase).toString();

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
