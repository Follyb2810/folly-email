const express = require('express');
const env = require('dotenv');
const cors = require('cors')
const emailModel = require('./model/EmailModel');
const connectDB = require('./Config/db');


env.config();
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/email', async (req, res) => {
  const { email,name,message } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    if(!email || !name || !message) return res.status(401).json({message:'Please, all input are require'})
    const newEmail = new emailModel({ email,name,message });

    await newEmail.save();

    res.status(200).json({ message:"Thank you for contacting us!." });
  } catch (error) {
    console.error('Please Provide a valid Email:', error);
    res.status(500).json({ message: 'Error saving email' });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(PORT, () => console.log('Server running on port:', PORT));
