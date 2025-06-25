import React, { useEffect, useState, useRef  } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Recipesabout = () => {
  const { id } = useParams(); // 👈 get the recipe ID from the route
  const [recipe, setRecipe] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!hasFetched.current) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response) => {
        setRecipe(response.data.data); // 👈 update state with recipe data
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
      hasFetched.current = true;}
  }, [id]);

  return (
    <div className="page-background">
      <Navbar />
      <div className="ml-5" style={{ minWidth: "300px" }}>
        {recipe ? (
          <>
            <h2 className="text-center shadow-heading">{recipe.title}</h2>
            <img
              className="ml-5 mt-3"
              src={
                recipe.image?.startsWith("http")
                  ? recipe.image
                  : `${process.env.REACT_APP_BACKEND_URL}${recipe.image}`
              }
              alt={`Image of ${recipe.title}`}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <br />
            <label className="mt-3">Created by: {recipe.Createdby}</label>
            <br />
            <label>Ingredients: {recipe.ingredients}</label>
            <br />
            <label>Steps: {recipe.steps}</label>
            <br />
            <label>Cooking Time: {recipe.cookingtime} minutes</label>
            <br />
            <label>Difficulty Level: {recipe.difficultylevel}</label>
            <br />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Recipesabout;
