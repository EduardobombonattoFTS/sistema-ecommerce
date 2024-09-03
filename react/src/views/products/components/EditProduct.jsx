import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import productService from "../services/products";

export default function EditProduc() {
  const { state } = useLocation();
  const { products } = state || {};
  const { uuid } = useParams();
  const navigate = useNavigate();

  const product = products?.find((c) => c.uuid === uuid);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const [name, setName] = useState(product.name);
  const [details, setDetails] = useState(product.details);
  const [description, setDescription] = useState(product.description);
  const [quantity_in_stock, setQuantity_in_stock] = useState(
    product.quantity_in_stock
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      details,
      description,
      quantity_in_stock,
    };

    productService
      .updateProduct(uuid, updatedProduct)
      .then(() => {
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erro ao atualizar Produto:", error);
      });
  };
  return (
    <div>
      <h2>Alterar Produto</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={product?.name || ""}
          />
        </div>
        <div>
          <label>Detalhes</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={product?.details || ""}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={product?.description || ""}
          />
        </div>
        <div>
          <label>Quantidade no estoque</label>
          <input
            type="text"
            value={quantity_in_stock}
            onChange={(e) => setQuantity_in_stock(e.target.value)}
            placeholder={product?.quantity_in_stock || ""}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
