import { useEffect, useState } from "react";
import clientService from "../services/clients";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Notification from "./Notification";

const ClientRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (!response.data.erro) {
            setStreet(response.data.logradouro);
            setDistrict(response.data.bairro);
            setCity(response.data.localidade);
            setState(response.data.uf);
          } else {
            setMessage("CEP não encontrado.");
          }
        })
        .catch(() => {
          setMessage("Erro ao buscar o CEP. Tente novamente.");
        });
    }
  }, [cep]);
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
        if (response.status) {
          const clientId = response.data.uuid;
          sessionStorage.setItem("successMessage", response.message);

          clientService
            .createAdress({
              cep: cep,
              street: street,
              number: number,
              district: district,
              city: city,
              state: state,
              client_id: clientId,
            })
            .then(() => {
              setRedirect(true);
            })
            .catch(() => {
              setMessage("Erro ao cadastrar o endereço. Tente novamente.");
            });
        } else {
          setMessage(response.message);
        }
      })
      .catch(() => {
        setMessage("Erro ao cadastrar o cliente. Tente novamente.");
      });
  };

  if (redirect) {
    return <Navigate to="/clients" />;
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>CEP:</label>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <div>
        <label>Rua:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label>Número:</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Bairro:</label>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>Estado:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <button type="submit">Cadastrar cliente</button>
    </form>
  );
};

export default ClientRegistration;
