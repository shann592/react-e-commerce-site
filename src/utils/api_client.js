import axios from "axios";
import config from "../config.json";

const apiClient = axios.create({
  baseURL: `${config.backendURL}/api`,
});

export default apiClient;
