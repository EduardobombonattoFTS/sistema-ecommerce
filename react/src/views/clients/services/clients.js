import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/clients/get_all`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/api/clients/create`, newObject);
  return request.then((response) => response.data);
};

const createAdress = (newObject) => {
  const request = axios.post(
    `${baseUrl}/api/clients_address/create`,
    newObject
  );
  return request.then((response) => response);
};

export default { getAll, create, createAdress };
