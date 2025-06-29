import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Myrecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/myrecipes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/Myrecipesedit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/myrecipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="page-background">
      <Navbar />
      <div className="container-fluid mt-5">
        <h2 className="text-center shadow-heading mb-4">My Recipes</h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : recipes.length === 0 ? (
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
                  width: '250px',
                  flex: '0 0 auto',
                  display: 'inline-block',
                }}
              >
                <a href={`/Recipesabout/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                </a>
                <div className="card-body text-center">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted">{recipe.Createdby}</p>
                  <button
                    onClick={() => handleEdit(recipe.id)}
                    className="btn btn-primary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Recipe Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/Addnewrecipe')}
            className="btn btn-success"
          >
            Add New Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myrecipes;
