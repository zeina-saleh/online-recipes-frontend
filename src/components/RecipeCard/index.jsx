import React from 'react';
import "./style.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card" >
      <img src={recipe.images[0].image_url} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <p>Cuisine: {recipe.cuisine}</p>
      <p>Likes: {recipe.likes_count}</p>
    </div>
  );
};

export default RecipeCard;
