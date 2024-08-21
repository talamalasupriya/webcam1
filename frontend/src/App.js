// App.js
import { Routes, Route } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import ImageList from './ImageList';


 
const App = () => {
   return (
      <>
   
         <Routes>
            <Route path="/" element={<WebcamCapture/>} />
            <Route path="/ImageList" element={<ImageList />} />
         </Routes>
         
      </>
   );
};
 
export default App;