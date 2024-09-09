import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const positionRef = useRef();
  const startDateRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [positions, setPositions] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axiosClient.get("/positions/get_all").then((response) => {
      setPositions(response.data.data);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      start_date: startDateRef.current.value,
      position: positionRef.current.value, // ID da posição
    };
    axiosClient
      .post("/users/create", payload)
      .then((response) => {
        setUser(response.data.data);
        setToken(response.data.data.token);
        debugger;
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create your account</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} placeholder="Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={startDateRef} type="date" placeholder="Start Date" />
          <select ref={positionRef}>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button className="btn btn-block">Sign Up</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
