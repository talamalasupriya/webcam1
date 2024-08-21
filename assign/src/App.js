import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
// Import the ImageList component

function App() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageList, setImageList] = useState([]); // State for image list

  // Function to capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);

    // Send image data to backend (e.g., using fetch or axios)
    const formData = new FormData();
    formData.append('image', imageSrc);

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  // Function to fetch image list from backend
  const fetchImageList = async () => {
    try {
      const response = await fetch('http://localhost:3001/images');
      const images = await response.json();
      setImageList(images); // Update state with fetched images
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="web-container">
      <Webcam ref={webcamRef} />
      <button className="capture-button button-space" onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured screenshot" />}
      <button className="fetch-button button-space" onClick={fetchImageList}>Show Photo List</button>
      <ImageList imageList={imageList} /> {/* Render the image list */}
    </div>
  );
}

export default App;
