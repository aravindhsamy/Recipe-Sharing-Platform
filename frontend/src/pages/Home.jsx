import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (query = '') => {
    try {
      const res = await axios.get(`/recipes${query ? `/search?title=${query}` : ''}`);
      setRecipes(res.data);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(search);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>🍳 Discover Delicious Recipes</h1>
        <p>Find and share everyday cooking inspiration on our platform.</p>
        <a className="cta-button" href="/add">Add Your Recipe</a>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Recipe Grid */}
      <div className="recipe-grid">
        {recipes.length ? recipes.map(recipe => (
          <div className="recipe-card" key={recipe._id}>
            <img
              src={recipe.imageUrl || `https://source.unsplash.com/400x300/?${recipe.title}`}
              alt={recipe.title}
            />
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions.slice(0, 100)}...</p>
            <a href={`/recipe/${recipe._id}`}>View Recipe</a>
          </div>
        )) : <p>No recipes found.</p>}
      </div>
    </div>
  );
};

export default Home;
