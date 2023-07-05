import "./Navbar.css";
import { useUserContext } from "../context/UserContext";
import { logout } from "../../api/user";

function Navbar() {
  const { user, setToken } = useUserContext();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setToken("");
      window.location.href = "/login ";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <h2>Bonjour {user ? user.name : "connect yourself"}</h2>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default Navbar;
