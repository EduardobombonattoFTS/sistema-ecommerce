import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/clients/get_all`);
  return request.then((response) => response.data.data);
};

export default { getAll };
