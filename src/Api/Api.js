import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
// Function to extract payload from the token
function getPayloadFromToken(token) {
  if (!token) return null;

  const base64Payload = token.split(".")[1];
  const decodedPayload = atob(base64Payload);
  return JSON.parse(decodedPayload);
}

// Function to extract the username from the token
function getUsernameFromToken(token) {
  const payload = getPayloadFromToken(token);
  return payload ? payload.username : null;
}

const token = localStorage.getItem("token");
const username = getUsernameFromToken(token);

export const loginUserApi = async function (username, password) {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
export const registerUserApi = async function (username, password) {
  try {
    const response = await api.post("/register", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const fetchSongsApi = async function () {
  try {
    const response = await api.get(`/${username}/Home`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
};

export const addSongApi = async function (formData) {
  try {
    const response = await api.post(`/${username}/addsong`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
};

export const editSongApi = async function (song, id) {
  try {
    const response = await api.put(`/${username}/${id}`, song, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing song:", error);
    throw error;
  }
};
export const deleteSongApi = async function (id) {
  try {
    const response = await api.delete(`/${username}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
};
export const fetchStatistics = async function () {
  try {
    const response = await api.get("/statistics");
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
