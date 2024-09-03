import { useEffect, useState } from "react";
import productService from "../services/products";
import Notification from "./Notification";
import { Navigate } from "react-router-dom";

const ProductRegistration = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectCategorieRegistration, setRedirectCategorieRegistration] =
    useState(false);

  useEffect(() => {
    productService
      .getAllCategories()
      .then((returnedCategories) => {
        setCategorie(returnedCategories.data);
      })
      .catch((error) => {
        setMessage("Erro ao carregar categorias. Tente novamente.");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    productService
      .createProduct({
        name: name,
        details: details,
        description: description,
        quantity_in_stock: quantityInStock,
        categorie_id: categorie_id,
      })
      .then((response) => {
        sessionStorage.setItem("successMessage", response.message);
        setRedirect(true);
      })
      .catch(() => {
        setMessage("Erro ao cadastrar o produto. Tente novamente.");
      });
  };

  const handleRedirectCategorieRegistration = () => {
    setRedirectCategorieRegistration(true);
  };

  if (redirect) {
    return <Navigate to="/products" />;
  }

  if (redirectCategorieRegistration) {
    return <Navigate to="/products/categories/registration" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Notification message={message} type="error" />
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Detalhes:</label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="text"
          value={quantityInStock}
          onChange={(e) => setQuantityInStock(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoria do Produto</label>
        <div className="select-container">
          <select
            name="categories"
            id="categorie"
            onChange={(e) => setCategorieId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorie.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </select>
          <button
            className="select-button"
            type="button"
            onClick={handleRedirectCategorieRegistration}
          >
            Criar Nova Categoria
          </button>
        </div>
      </div>
      <br />
      <button type="submit">Cadastrar produto</button>
    </form>
  );
};
export default ProductRegistration;
