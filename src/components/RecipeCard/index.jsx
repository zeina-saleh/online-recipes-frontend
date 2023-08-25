import React from 'react';
import "./style.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
    <div className="recipe-image">
        {recipe.images && recipe.images.length > 0 ? (
            <img src={`data:image/jpeg;base64,${recipe.images[0].image_url}`} alt={recipe.title} />
        ) : (
            <img src="http://content.health.harvard.edu/wp-content/uploads/2021/11/7640be02-f078-4f16-91da-6cf32d186e46.jpg" alt={recipe.title} />
        )}
    </div>
    <div className="recipe-details">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
        <div className="recipe-likes">
            <i className="far fa-heart"></i>
            <span>{recipe.likes_count}</span>
        </div>
    </div>
</div>
  );
};

export default RecipeCard;
