// src/pages/AddRecipe.jsx
import React, { useState } from 'react';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Recipe added:\nTitle: ${title}\nInstructions: ${instructions}`);
    // TODO: add API call to save recipe
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Segoe UI' }}>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} required /><br /><br />

        <label>Instructions:</label><br />
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          rows={6}
          required
        /><br /><br />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
