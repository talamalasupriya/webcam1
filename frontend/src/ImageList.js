import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageList() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      fetchImages(); // Refresh the list of images
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  return (
    <div>
      {images.map((img, index) => (
        <div key={img._id} style={{ marginBottom: '20px', position: 'relative', display: 'inline-block' }}>
          <img src={img.image} alt={`Captured ${index + 1}`} width="320" height="240" />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px',
            borderRadius: '5px',
          }}>
            <p>ID: {index + 1}</p>
            <p>Date: {img.date ? new Date(img.date).toLocaleString() : 'No Date Available'}</p>
          </div>
          <button
            onClick={() => deleteImage(img._id)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'red',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
