import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import clientService from "../services/clients";

export default function EditClient() {
  const { state } = useLocation();
  const { clients } = state || {};
  const { uuid } = useParams();
  const navigate = useNavigate();

  const client = clients?.find((c) => c.uuid === uuid);

  if (!client) {
    return <div>Cliente não encontrado.</div>;
  }

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [cpf, setCpf] = useState(client.cpf);
  const [phone, setPhone] = useState(client.phone);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedClient = {
      name,
      email,
      cpf,
      phone,
    };

    clientService
      .updateClient(uuid, updatedClient)
      .then(() => {
        navigate("/clients");
      })
      .catch((error) => {
        console.error("Erro ao atualizar cliente:", error);
      });
  };
  return (
    <div>
      <h2>Alterar Cliente</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={client?.name || ""}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={client?.email || ""}
          />
        </div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder={client?.cpf || ""}
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={client?.phone || ""}
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
