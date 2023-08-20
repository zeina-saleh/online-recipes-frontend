import React, { useEffect, useState } from 'react';
import RecipeCard from '../../RecipeCard';
import { sendRequest } from '../../../config/request';
import { Link } from 'react-router-dom'; 
import "./style.css";

const Landing = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await sendRequest({ route: "/getRecipe", body: "" });
      setRecipes(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    fetchRecipes();
  }, []); 

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <Link key={recipe.id} to={`/landing/${recipe.id}`}>
        <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};

export default Landing;
