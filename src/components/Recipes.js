import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

    const handleSearch = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipesearch?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="page-background">
      <Navbar />

      <div className="container-fluid">
        <h2 className="shadow-heading text-center mb-4">Recipes</h2>

        {/* Optional Search UI (not implemented) */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <input
            type="search"
            placeholder="Search by title"
            className="form-control me-2"
            style={{ maxWidth: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary ml-3">
            Search
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center">No recipes found.</div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center px-3 "
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              gap: '1rem',
              paddingBottom: '1rem',
            }}
          >
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="card shadow recipe-card"
                style={{
                  width: "250px",
                  flex: "0 0 auto",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/Recipesabout/${recipe.id}`)}
              >
                <img
                  src={
                    recipe.image?.startsWith("http")
                      ? recipe.image
                      : `${process.env.REACT_APP_BACKEND_URL}${recipe.image}`
                  }
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default.jpg"; // optional fallback image
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted">{recipe.Createdby}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <br />
        <br />
      </div>
    </div>
  );
};

export default Recipes;
