const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors=require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
// MongoDB connection
const uri='mongodb+srv://supriya:9KtovH0YjwHtjxB5@cluster0.nxdjqkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri)
.then(()=> console.log("the database is connected")).catch(err=> console.log("error",err));

const ImageSchema = new mongoose.Schema({
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
},
  date: { type: Date, default: Date.now } // Adding a date field with a default value of the current date
});

const Image = mongoose.model('Image', ImageSchema);
const storage=multer.memoryStorage();
const upload=multer({storage});

app.post('/upload', async (req, res) => {
  const { image } = req.body;

  try {
    const newImage = new Image({ image });
    await newImage.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});
// Add this route to fetch all images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});
app.delete('/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
