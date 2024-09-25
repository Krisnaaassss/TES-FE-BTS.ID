import axios from "axios";

const BASE_URL = "http://94.74.86.174:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Authorization Header Set:", `Bearer ${token}`);
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    console.error("No token found in localStorage.");
    return {};
  }
};

const ApiService = {
  login: (username, password) => api.post("/login", { username, password }),
  register: (username, email, password) =>
    api.post("/register", { username, email, password }),

  // Checklists
  getAllChecklists: () => api.get("/checklist", setAuthHeader()),
  createChecklist: (name) => api.post("/checklist", { name }, setAuthHeader()),
  deleteChecklist: (checklistId) =>
    api.delete(`/checklist/${checklistId}`, setAuthHeader()),

  // Checklist Items
  getChecklistItems: (checklistId) =>
    api.get(`/checklist/${checklistId}/item`, setAuthHeader()),

  createChecklistItem: (checklistId, itemName) =>
    api.post(`/checklist/${checklistId}/item`, { itemName }, setAuthHeader()),
  getChecklistItem: (checklistId, checklistItemId) =>
    api.get(
      `/checklist/${checklistId}/item/${checklistItemId}`,
      setAuthHeader()
    ),
  updateChecklistItemStatus: (checklistId, checklistItemId) =>
    api.put(
      `/checklist/${checklistId}/item/${checklistItemId}`,
      {},
      setAuthHeader()
    ),
  deleteChecklistItem: (checklistId, checklistItemId) =>
    api.delete(
      `/checklist/${checklistId}/item/${checklistItemId}`,
      setAuthHeader()
    ),
  renameChecklistItem: (checklistId, checklistItemId, itemName) =>
    api.put(
      `/checklist/${checklistId}/item/rename/${checklistItemId}`,
      { itemName },
      setAuthHeader()
    ),
};

export default ApiService;
