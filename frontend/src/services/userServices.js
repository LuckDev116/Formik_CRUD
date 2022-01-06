import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function createNewUser(data) {
  const response = await axios.post(`${apiUrl}/users/`, data);
  return response;
}

export async function getAllUsers() {
  const allUsers = await axios.get(`${apiUrl}/users/`);
  return allUsers;
}

export async function deleteUser(id) {
  const deletedUser = await axios.delete(`${apiUrl}/users/${id}`);
  return deletedUser;
}

export async function getOneUser(id) {
  const foundUser = await axios.get(`${apiUrl}/users/${id}`);
  return foundUser;
}

export async function updateOneUser(id, data) {
  const updatingUser = await axios.put(`${apiUrl}/users/${id}`, data);
  return updatingUser;
}
