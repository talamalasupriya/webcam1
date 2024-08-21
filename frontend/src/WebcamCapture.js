import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [scannedImage, setScannedImage] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Capture from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // Handle file input (scanned image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScannedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload the image (either from webcam or scanned)
  const uploadImage = async () => {
    const imageToUpload = imageSrc || scannedImage;
    if (imageToUpload) {
      try {
        await axios.post('http://localhost:5000/upload', { image: imageToUpload });
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
  };

  return (
    <div className="outer-container">
      <div className="camera-container">
        <div className="camera-area">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="video"
          />
        </div>
        <div className="button-area">
          <button onClick={capture} className="button">
            Capture
          </button>
          <button onClick={uploadImage} disabled={!imageSrc && !scannedImage} className={`button ${!imageSrc && !scannedImage ? 'button-disabled' : ''}`}>
            Upload
          </button>
        </div>
        <button onClick={() => navigate("/ImageList")} className="photo-list-button">
          Image List
        </button>
        <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={imageSrc} alt='sample'/>
        </Box>
      </Modal>
    </div>
  </div>
      {/* Scanner (File Input) */}
      <div className="scanner-container">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default WebcamCapture;
