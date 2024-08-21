import { useEffect, useState } from "react";
import clientService from "./services/clients";
import ShowClients from "./components/ShowClients";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    clientService.getAll().then((returnedClient) => {
      setClients(returnedClient);
    });
  }, []);

  const clientsToShow = clients.filter((client) => client.name.toLowerCase());

  return (
    <div>
      <ShowClients clientsToShow={clientsToShow} />
    </div>
  );
}
