import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      <Link className="back-link" to="/recipes">← Back to Recipes</Link>
      <h1>{recipe.title}</h1>
      <img
        src={recipe.imageUrl || `https://source.unsplash.com/800x600/?${recipe.title}`}
        alt={recipe.title}
      />
      <h3>Category: {recipe.category || 'Uncategorized'}</h3>
      <p><strong>Author:</strong> {recipe.author || 'Anonymous'}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
