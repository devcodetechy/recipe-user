import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <NavLink to="/" className="nav-link mr-4">
        Home
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink to="/Login" className="nav-link mr-4">
            Login
          </NavLink>
          <NavLink to="/Signup" className="nav-link mr-4">
            Signup
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <NavLink to="/Recipes" className="nav-link mr-4">
            Recipes
          </NavLink>
          <NavLink to="/Myrecipes" className="nav-link mr-4">
            My Recipes
          </NavLink>
          <NavLink to="/Addnewrecipe" className="nav-link mr-4">
            Add New Recipe
          </NavLink>
          <NavLink to="/Passwordreset" className="nav-link mr-4">
            Password Reset
          </NavLink>
          <span
            className="nav-link mr-4"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </span>
        </>
      )}
    </nav>
  );
}

export default Navbar;
