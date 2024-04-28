import axios from "axios";

// Mendapatkan URL backend dari environment
export const backendURL = import.meta.env.VITE_BASE_URL;
console.log(backendURL);
// Membuat instance axios dengan baseURL yang sesuai
const AxiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});


// Ekspor instance axios yang sudah dikonfigurasi
export default AxiosInstance;
