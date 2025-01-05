// src/fetcher.js
import api from './api'; // Your custom Axios instance

const fetcher = (url) => api.get(url).then((res) => res.data);
const postFetcher = (url, { arg }) => api.post(url, arg);
const deleteFetcher = (url, { arg }) => api.delete(url, arg);
const updateFetcher = (url, { arg }) => api.put(url, arg);

export { fetcher, postFetcher, deleteFetcher, updateFetcher };