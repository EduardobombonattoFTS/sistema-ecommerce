import { useState } from "react";
import clientService from "../services/clients";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ClientRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    clientService
      .create({
        name: name,
        email: email,
        cpf: cpf,
        phone: phone,
      })
      .then((response) => {
        console.log(response);
        setRedirect(true);
      });
  };

  if (redirect) {
    return <Navigate to="/clients" />;
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
};

export default ClientRegistration;
