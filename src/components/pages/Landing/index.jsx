import React, { useEffect, useState } from 'react';
import RecipeCard from '../../RecipeCard';
import { sendRequest } from '../../../config/request';
import { Link } from 'react-router-dom';
import "./style.css";
import Nav from '../../Nav';
import Modal from "react-modal";
import ModalForm from '../../ModalForm';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Landing = () => {
  const [recipes, setRecipes] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await sendRequest({ route: "/getRecipe", body: "" });
      setRecipes(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await sendRequest({ route: "/getDate", body: "" });
      console.log(response);
      const schedule = response.schedule;
      setEvents(schedule);
      console.log(events)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchPlans();
  }, []);

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const handleOpenCalendarModal = () => setOpenCalendarModal(true)
  const handleCloseCalendarModal = () => setOpenCalendarModal(false)


  return (
    <div>
      <Nav handleOpenModal={handleOpenModal} handleOpenCalendarModal={handleOpenCalendarModal} />
      <div className="recipe-list">
        <div className='container'>
          <div className="content">
            {recipes.map(recipe => (
              <Link key={recipe.id} to={`/landing/${recipe.id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={openModal}
        onRequestClose={handleCloseModal}>
        <ModalForm handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal isOpen={openCalendarModal}
        onRequestClose={handleCloseCalendarModal}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
        />
      </Modal>
    </div>
  );
};

export default Landing;
