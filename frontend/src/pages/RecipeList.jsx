import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecipeList.css';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/recipes')
      .then(res => setRecipes(res.data.recipes || res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="recipe-list-container">
      <h1 className="page-title">All Recipes</h1>
      <div className="recipe-list-grid">
        {recipes.map(recipe => (
          <div className="recipe-card" key={recipe._id}>
            <img
              src={recipe.imageUrl || `https://source.unsplash.com/400x300/?${recipe.title}`}
              alt={recipe.title}
            />
            <div className="recipe-card-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.instructions.slice(0, 100)}...</p>
              <Link to={`/recipe/${recipe._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
