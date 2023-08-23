import React, { useEffect, useState } from 'react';
import RecipeCard from '../../RecipeCard';
import { sendRequest } from '../../../config/request';
import { Link } from 'react-router-dom';
import "./style.css";
import Nav from '../../Nav';
import Modal from "react-modal";
import ModalForm from '../../ModalForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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

  // Modal.setAppElement(<Landing/>);

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const handleOpenCalendarModal = () => setOpenCalendarModal(true)
  const handleCloseCalendarModal = () => setOpenCalendarModal(false)


  return (
    <div>
      <Nav handleOpenModal={handleOpenModal} handleOpenCalendarModal={handleOpenCalendarModal}/>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <Link key={recipe.id} to={`/landing/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
      <Modal isOpen={openModal}
        onRequestClose={handleCloseModal}>
        <ModalForm handleCloseModal={handleCloseModal}/>
      </Modal>
      <Modal isOpen={openCalendarModal}
        onRequestClose={handleCloseCalendarModal}
        className="calendar">
        <Calendar handleCloseModal={handleCloseCalendarModal}/>
      </Modal>
    </div>
  );
};

export default Landing;
