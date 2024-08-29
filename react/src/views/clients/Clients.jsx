import { useEffect, useState } from "react";
import clientService from "./services/clients";
import ShowClients from "./components/ShowClients";
import Notification from "./components/Notification";
import { Navigate, useNavigate } from "react-router-dom";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [redirectClienteRegistration, setRedirectClienteRegistration] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    clientService
      .getAll()
      .then((returnedClient) => {
        if (returnedClient.errors) {
          setErrorMessage(returnedClient.errors.join(", "));
        } else {
          setClients(returnedClient.data);
          const message = sessionStorage.getItem("successMessage");
          if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("successMessage");
          }
        }
      })
      .catch(() => {
        setErrorMessage("Erro ao buscar clientes. Tente novamente mais tarde.");
      });
  }, []);

  const handleEditClient = (uuid) => {
    navigate(`/clients/edit/${uuid}`, { state: { clients } });
  };

  const handleDeleteClient = (uuid, name) => {
    if (window.confirm(`Deseja excluir ${name} da lista de clientes?`)) {
      clientService
        .deleteClient(uuid)
        .then((response) => {
          setClients(clients.filter((client) => client.uuid !== uuid));
          setSuccessMessage(response.message);
        })
        .catch((response) => {
          setErrorMessage(response.message);
        });
    }
  };

  const handleRedirectClientRegistration = () => {
    setRedirectClienteRegistration(true);
  };

  if (redirectClienteRegistration) {
    return <Navigate to="/clients/registration" />;
  }

  const clientsToShow = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Pesquisar clientes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-bar button "
          onClick={handleRedirectClientRegistration}
        >
          Novo Cliente
        </button>
      </div>
      <ShowClients
        clientsToShow={clientsToShow}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
      />
    </div>
  );
}
