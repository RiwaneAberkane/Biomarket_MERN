import axios from "axios";
import "./Navbar.css";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const { user } = useUserContext();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/users/logout");
      localStorage.removeItem("token");
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
