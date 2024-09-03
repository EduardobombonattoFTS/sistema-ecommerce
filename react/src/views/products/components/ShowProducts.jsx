const ShowProducts = ({ productsToShow, onDeleteProducts }) => {
  const maxLength = 20; // Defina o comprimento máximo que deseja exibir
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Detalhes</th>
            <th>Descrição</th>
            <th>Quantidade no estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product) => {
            return (
              <tr key={product.uuid}>
                <td>{product.name}</td>
                <td>{truncateText(product.details, maxLength)}</td>
                <td>{truncateText(product.description, maxLength)}</td>
                <td>{product.quantity_in_stock}</td>
                <td>{product.categorie_id}</td>
                <td>
                  {/* <button
                    className="edit-button"
                    onClick={() => onEditClient(product.uuid)}
                  >
                    Editar
                  </button> */}
                  <button
                    className="delete-button"
                    onClick={() => onDeleteProducts(product.uuid, product.name)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShowProducts;
