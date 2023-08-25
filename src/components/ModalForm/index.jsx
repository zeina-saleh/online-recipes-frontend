import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../Button';
import './style.css';
import { sendRequest } from '../../config/request';

const ModalForm = ({ handleCloseModal }) => {
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredientInputVisible, setIngredientInputVisible] = useState(false);

    const handleCuisineChange = (selectedOption) => {
        setSelectedCuisine(selectedOption);
    };

    const handleIngredientChange = (selectedOptions) => {
        setSelectedIngredients(selectedOptions);
        setIngredientInputVisible(true);
        setIngredientQuantity('');
    };

    const handleIngredientQuantityChange = (e) => {
        setIngredientQuantity(e.target.value);
    };

    const addIngredientQuantity = () => {
        const updatedIngredients = selectedIngredients.map((ingredient) => {
            if (ingredient.id === selectedIngredients[0].id) {
                return {
                    id: ingredient.id,
                    quantity: parseFloat(ingredientQuantity),
                };
            }
            return ingredient;
        });

        setSelectedIngredients(updatedIngredients);
        setIngredientInputVisible(false);
        setIngredientQuantity('');
    };

    const handleImageChange = (e) => {
        const selectedImagesArray = Array.from(e.target.files);
        setSelectedImages(selectedImagesArray);
    };

        const getBase64Image = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                const base64Image = reader.result.split(',')[1];
                resolve(base64Image);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const requestData = {
            cuisine_id: selectedCuisine ? selectedCuisine.value : null,
            title: data.title,
            description: data.description,
            directions: data.directions,
            images: [], 
            ingredients: selectedIngredients.map((ingredient) => ({
                id: ingredient.id,
                quantity: ingredient.quantity,
            })),
        };

        const imagePromises = selectedImages.map(async (imageFile) => {
            const base64Image = await getBase64Image(imageFile);
            requestData.images.push(base64Image);
        });

        await Promise.all(imagePromises);

        try {
            const response = await sendRequest({
                method: 'POST',
                route: '/addRecipe',
                body: requestData,
            });
            console.log(response);
            setData(defaultState);
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };


    const options1 = [
        { value: 1, label: 'Italian' },
        { value: 2, label: 'French' },
        { value: 3, label: 'Turkish' },
    ];

    const options2 = [
        { value: 1, label: 'Potato (kg)' },
        { value: 2, label: 'Oil (L)' },
        { value: 3, label: 'Salt (kg)' },
    ];

    const defaultState = {
        title: '',
        description: '',
        directions: '',
    };

    const [data, setData] = useState(defaultState);

    return (
        <div className='modal-form-container'>
            <div className='form-container'>
                <div>
                    <label>Cuisine:</label>
                    <Select isSearchable placeholder='Select cuisine' value={selectedCuisine} onChange={handleCuisineChange} options={options1} />
                </div>
                <div>
                    <label>Recipe Title</label>
                    <input name='title' value={data.title} onChange={handleDataChange} placeholder='Enter recipe title' />
                </div>
                    <label>Upload Images</label>
                    <input type='file' multiple onChange={handleImageChange} />
                <div>
                    <label>Description</label>
                    <textarea name='description' value={data.description} onChange={handleDataChange} placeholder='Enter description' />
                </div>
                <div>
                    <label>Directions</label>
                    <textarea name='directions' value={data.directions} onChange={handleDataChange} placeholder='Enter directions' />
                </div>
                <div>
                    <label>Ingredients:</label>
                    <Select isMulti isSearchable placeholder='Select ingredients' value={selectedIngredients} onChange={handleIngredientChange} options={options2} />
                </div>
                {ingredientInputVisible && (
                    <div>
                        <label>Ingredient Quantity:</label>
                        <input type='number' value={ingredientQuantity} onChange={handleIngredientQuantityChange} placeholder='Enter quantity' />
                        <Button color='primary-bg' textColor='white-text' text='Add Quantity' onClick={addIngredientQuantity} />
                    </div>
                )}
            </div>
            <div className='buttons-container'>
                <Button color='primary-bg' textColor='white-text' text='Cancel' onClick={handleCloseModal} />
                <Button color='primary-bg' textColor='white-text' text='Save' onClick={handleSave} />
            </div>
            
        </div>
    );

};
export default ModalForm;