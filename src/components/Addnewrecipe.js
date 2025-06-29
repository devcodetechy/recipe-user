import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AddNewRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cookingtime: '', // in minutes
    difficultylevel: 'Easy',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipe({ ...recipe, image: files[0] });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let key in recipe) {
      if (recipe[key] !== null) {
        formData.append(key, recipe[key]);
      }
    }


    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addnewrecipes`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/Myrecipes');
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  return (
    <div className="page-background">
      <Navbar />
      <div className="mt-5">
        <h2 className="text-center shadow-heading">Add New Recipe</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Title:</label>
          <input className="form-control" name="title" value={recipe.title} onChange={handleChange} required />

          <label>Ingredients:</label>
          <textarea className="form-control" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />

          <label>Steps:</label>
          <textarea className="form-control" name="steps" value={recipe.steps} onChange={handleChange} required />

          <label>Cooking Time (in minutes):</label>
          <input type="number" className="form-control" name="cookingtime" value={recipe.cookingtime} onChange={handleChange} required />

          <label>Difficulty Level:</label>
          <select className="form-control" name="difficultylevel" value={recipe.difficultylevel} onChange={handleChange} required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>

          <label>Image:</label>
          <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} required />

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRecipe;
