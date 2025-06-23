import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Recipesedit = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    difficultylevel: "",
    cookingtime: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`http://localhost:3001/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipe(res.data.data);
        console.log(res.data.data)
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3001/myrecipesedit/${id}`,
        {
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          difficultylevel: recipe.difficultylevel,
          cookingtime: recipe.cookingtime,
          image: recipe.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/Myrecipes");
    } catch (err) {
      console.error("Failed to update recipe:", err);
    }
  };

  return (
    <div className="page-background">
      <Navbar />
      <div className="ml-5" style={{ minWidth: "300px" }}>
        <h2 className="mt-3 text-center shadow-heading">Edit Recipe</h2>
        <label>Title:</label>
        <input className="form-control" name="title" value={recipe.title} onChange={handleChange} />
        <label>Ingredients:</label>
        <input className="form-control" name="ingredients" value={recipe.ingredients} onChange={handleChange} />
        <label>Steps:</label>
        <input className="form-control" name="steps" value={recipe.steps} onChange={handleChange} />
        <label>Difficulty Level:</label>
          <select className="form-control" name="difficultylevel" value={recipe.difficultylevel} onChange={handleChange} required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>
        <label>Cooking Time (in minutes):</label>
        <input type="number" className="form-control" name="cookingtime" value={recipe.cookingtime} onChange={handleChange} required />
        <label>Image:</label><br />
        {recipe.image && (
          <img
            src={`http://localhost:3001/${recipe.image}`}
            alt="Recipe"
            style={{ width: "200px", height: "150px", objectFit: "cover" }}
          />
        )}
        <div className="text-center mt-3">
          <button onClick={handleSubmit} className="btn btn-primary rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipesedit;
