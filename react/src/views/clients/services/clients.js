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
  return request.then((response) => response.data);
};

const updateClient = (uuid, newObject) => {
  const request = axios.put(`${baseUrl}/api/clients/update/${uuid}`, newObject);
  return request.then((response) => response.data);
};

const deleteClient = (uuid) => {
  const request = axios.delete(`${baseUrl}/api/clients/delete/${uuid}`);
  return request.then((response) => response.data);
};
export default { getAll, create, createAdress, updateClient, deleteClient };
