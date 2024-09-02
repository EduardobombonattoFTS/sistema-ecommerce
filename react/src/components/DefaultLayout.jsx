import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function DefaulLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (event) => {
    event.preventDefault();
  };

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/clients">Clientes</Link>
        <Link to="/products">Produtos</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a className="btn-logout" onClick={onLogout} href="">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
