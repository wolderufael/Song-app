import axios from 'axios';
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});
 


export const fetchSongsApi = async function () {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching song:', error);
    throw error;
  }
};

export const addSongApi = async function (formData) {
  try {
    const response = await api.post('/addsong',formData);
    return response.data;
  }
  catch (error) {
    console.error('Error adding song:', error);
    throw error;
  }
}


export const editSongApi = async function (id,formData) {
  try {
    const response = await api.put(`/editsong/${id}`,formData);
    return response.data;
  }
  catch (error) {
    console.error('Error editing song:', error);
    throw error;
  }
}
export const deleteSongApi = async function (id,formData) {
  try {
    const response = await api.delete(`/${id}`,formData);
    return response.data;
  }
  catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
}
export const fetchStatistics = async function () {
  try {
    const response = await api.get("/statistics");
    return response.data;
  }
  catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
}

