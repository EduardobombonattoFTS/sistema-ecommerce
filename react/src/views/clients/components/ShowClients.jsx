const ShowClients = ({ clientsToShow }) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShowClients;
