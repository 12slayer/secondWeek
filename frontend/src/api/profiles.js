import axios from 'axios';

// Points at your Express + MongoDB backend (server.js on port 3000)
const API_URL = 'http://localhost:3000/profiles';

export const getProfiles = () => axios.get(API_URL).then((res) => res.data);

export const getProfile = (id) =>
  axios.get(`${API_URL}/${id}`).then((res) => res.data);

export const createProfile = (data) =>
  axios.post(API_URL, data).then((res) => res.data);

export const updateProfile = (id, data) =>
  axios.put(`${API_URL}/${id}`, data).then((res) => res.data);

export const deleteProfile = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);
