import axios from "axios";
/*eslint-disable */
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const loginUserApi = async function (username, password) {
  try {
    const response = await api.post("/login", { username, password });
    console.log(response.data);

    // Store token and username in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("userId", response.data.userId);

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

export const logoutUserApi = async function () {
  try {
    const response = await api.post("/logout");

    // Clear token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const fetchSongsApi = async function () {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  try {
    const response = await api.get(`/${username}/Home`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};

export const addSongApi = async function (formData) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

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
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

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
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

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
   const token = localStorage.getItem("token");
   const username = localStorage.getItem("username");
   const userId = localStorage.getItem("userId");
  try {
    const response = await api.get(`/statistics/${userId}`,
      {
      headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
