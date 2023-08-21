import React from 'react'
import { useState } from 'react';
// import { sendRequest } from '.';
import axios from 'axios';
import SelectMenu from '../SelectMenu';
import Button from '../Button';


const ModalForm = ({ handleCloseModal }) => {

    const defaultState = {
        title: "",
        description: "",
        directions: "",
    }

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const [data, setData] = useState(defaultState)

    const handleSave = async () => {
        // 1- send the post request
        const response = await axios.post("http://localhost:8000/api/addRecipe", data);
        console.log(response.data)
        // 2- add the  to the list
        // handleAddRecipe(response.data)
        // 3- clear the inputs
        setData(defaultState)
        // 4- close the modal
        handleCloseModal()
    }

    function AddRecipe () {
        console.log('Recipe added')
    }

    return (
        <div>
            <div className='form-container'>
                <div>
                    <div htmlFor="cuisine">Cuisine</div>
                    <SelectMenu />
                    <br />
                    <label>Recipe Title:</label><br />
                    <input name='title' value={data.title} onChange={handleDataChange} />
                </div>
                <div>
                    <label>Description:</label><br />
                    <input name='description' value={data.description} onChange={handleDataChange} />
                </div>
                <div>
                    <label>Directions:</label><br />
                    <input name='directions' value={data.directions} onChange={handleDataChange} />
                </div>
                <br />
                <div htmlFor="ingredients">Ingredients</div>
                <SelectMenu />
            </div>
            <br />
            <div className='buttons-container'>
                <Button color={"primary-bg"}
                    textColor={"white-text"}
                    text={"Cancel"}
                    onClick={() => handleCloseModal()}/>
                <Button color={"primary-bg"}
                    textColor={"white-text"}
                    text={"Save"}
                    onClick={() => AddRecipe()}/>
            </div>
        </div>
    )
}

export default ModalForm