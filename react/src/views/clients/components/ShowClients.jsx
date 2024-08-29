const ShowClients = ({ clientsToShow, onEditClient, onDeleteClient }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientsToShow.map((client) => {
            return (
              <tr key={client.uuid}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.cpf}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEditClient(client.uuid)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDeleteClient(client.uuid, client.name)}
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
export default ShowClients;
