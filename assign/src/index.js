import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import ImageList from './ImageList'; // Import the ImageList component

function App() {
  const [imageList, setImageList] = useState([]);

  const fetchImageList = async () => {
    try {
      const response = await fetch('http://localhost:3001/images');
      const images = await response.json();
      setImageList(images);
    } catch (error) {
      console.error('Error fetching image list:', error);
    }
  };

  useEffect(() => {
    fetchImageList(); // Fetch images when the component mounts
  }, []);

  return (
    <div className="web-container">
      <Webcam />
      <button onClick={fetchImageList}>Refresh Image List</button>
      <ImageList imageList={imageList} />
    </div>
  );
}

export default App;
