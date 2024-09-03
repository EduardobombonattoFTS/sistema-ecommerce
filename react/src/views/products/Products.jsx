import { useEffect, useState } from "react";
import productService from "./services/products";
import ShowProducts from "./components/ShowProducts";
import Notification from "./components/Notification";
import { Navigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [redirectProductRegistration, setRedirectProductRegistration] =
    useState(false);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((returnedProducts) => {
        if (returnedProducts.errors) {
          setErrorMessage(returnedProducts.errors.join(", "));
        } else {
          setProducts(returnedProducts.data);
          const message = sessionStorage.getItem("successMessage");
          if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("successMessage");
          }
        }
      })
      .catch(() => {
        setErrorMessage(
          "Erro ao buscar produtos  . Tente novamente mais tarde."
        );
      });
  }, []);

  const handleDeleteProduct = (uuid, name) => {
    if (window.confirm(`Deseja excluir ${name} da lista de produtos?`)) {
      productService
        .deleteProduct(uuid)
        .then((response) => {
          setProducts(products.filter((products) => products.uuid !== uuid));
          setSuccessMessage(response.message);
        })
        .catch((response) => {
          setErrorMessage(response.message);
        });
    }
  };

  const handleRedirectProductRegistration = () => {
    setRedirectProductRegistration(true);
  };

  if (redirectProductRegistration) {
    return <Navigate to="/products/registration" />;
  }

  const productsToShow = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}
      {errorMessage && <Notification message={errorMessage} type="error" />}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-bar button "
          onClick={handleRedirectProductRegistration}
        >
          Novo Produto
        </button>
      </div>
      <ShowProducts
        productsToShow={productsToShow}
        // onEditClient={handleEditClient}
        onDeleteProducts={handleDeleteProduct}
      />
    </div>
  );
}
