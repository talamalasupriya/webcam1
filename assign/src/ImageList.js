// App.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
// Import the ImageList component

function App() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageList, setImageList] = useState([]); // State for image list

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);

    // Send image data to backend
    const formData = new FormData();
    formData.append('image', imageSrc);

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error uploading image:', error));
  };

  const fetchImageList = async () => {
    try {
      const response = await fetch('http://localhost:3001/images');
      const images = await response.json();
      setImageList(images); // Update state with fetched images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="web-container">
      <Webcam ref={webcamRef} />
      <button className="capture-button button-space" onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured screenshot from webcam" />}
      <button className="capture-button button-space" onClick={fetchImageList}>Show Photo List</button>
      <ImageList imageList={imageList} /> {/* Use the ImageList component */}
    </div>
  );
}

export default App;
