import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Landing = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // This is the entire data URL
      };
      reader.readAsDataURL(file); // Read the image file as data URL
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const imageData = selectedImage.split(",")[1]; // Extract base64 data
      try {
        const response = await axios.post("/uploadImage", {
          image: imageData, // Send the base64 data to the server
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100px' }} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default Landing