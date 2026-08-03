import axios from 'axios';

// Points at your Express + MongoDB backend (server.js on port 3000)
export const SERVER_URL = 'http://localhost:3000';
const API_URL = `${SERVER_URL}/profiles`;

export const getProfiles = (search = '') =>
  axios.get(API_URL, { params: search ? { search } : {} }).then((res) => res.data);

export const toggleFavorite = (id) =>
  axios.patch(`${API_URL}/${id}/favorite`).then((res) => res.data);

export const getProfile = (id) =>
  axios.get(`${API_URL}/${id}`).then((res) => res.data);

// Builds a multipart/form-data payload — required because we're sending
// a file (avatar) alongside regular text fields. Axios auto-detects
// FormData and sets the correct Content-Type + boundary itself.
const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'avatarFile' && value) {
      formData.append('avatar', value); // must match upload.single('avatar') on the backend
    } else if (key !== 'avatarFile' && key !== 'avatarUrl' && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const createProfile = (data) =>
  axios.post(API_URL, toFormData(data)).then((res) => res.data);

export const updateProfile = (id, data) =>
  axios.put(`${API_URL}/${id}`, toFormData(data)).then((res) => res.data);

export const deleteProfile = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);