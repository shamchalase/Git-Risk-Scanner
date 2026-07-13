import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const scanRepository = async (username) => {
  const response = await API.post("/scan", {
    username,
  });

  return response.data;
};
