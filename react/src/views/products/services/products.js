import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAllProducts = () => {
  const request = axios.get(`${baseUrl}/api/products/get_all`);
  return request.then((response) => response.data);
};

const createProduct = (newObject) => {
  const request = axios.post(`${baseUrl}/api/products/create`, newObject);
  return request.then((response) => response.data);
};

const updateProduct = (uuid, newObject) => {
  const request = axios.put(
    `${baseUrl}/api/products/update/${uuid}`,
    newObject
  );
  return request.then((response) => response.data);
};

const deleteProduct = (uuid) => {
  const request = axios.delete(`${baseUrl}/api/products/delete/${uuid}`);
  return request.then((response) => response.data);
};

const getAllCategories = () => {
  const request = axios.get(`${baseUrl}/api/products_categories/get_all`);
  return request.then((response) => response.data);
};

const createCategorie = (newObject) => {
  const request = axios.post(
    `${baseUrl}/api/products_categories/create`,
    newObject
  );
  return request.then((response) => response.data);
};

const updateCategorie = (uuid, newObject) => {
  const request = axios.put(
    `${baseUrl}/api/products_categories/update/${uuid}`,
    newObject
  );
  return request.then((response) => response.data);
};

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategorie,
  updateCategorie,
};
