import Notification from "./Notification";
import productService from "../services/products";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProductCategorieRegistration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productService
      .getAllCategories()
      .then((returnedCategories) => {
        setCategories(returnedCategories.data);
      })
      .catch((error) => {
        setMessage("Erro ao carregar categorias. Tente novamente.");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categories.find((c) => c.name === name)) {
      alert(
        `A categoria ${name} ja existe, por favor verifique as informações`
      );
      return;
    }
    productService
      .createCategorie({
        name: name,
        description: description,
      })
      .then((response) => {
        sessionStorage.setItem("successMessage", response.message);
        setRedirect(true);
      })
      .catch((error) => {
        setMessage("Erro ao cadastrar o categoria. Tente novamente.");
      });
  };

  if (redirect) {
    return <Navigate to="/products/registration" />;
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
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <button type="submit">Cadastrar categoria</button>
    </form>
  );
};
export default ProductCategorieRegistration;
