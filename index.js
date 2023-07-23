const express = require('express');
const env = require('dotenv');
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
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    const newEmail = new emailModel({ email });
    await newEmail.save();

    res.status(200).json({ message: 'Email submitted and saved successfully' });
  } catch (error) {
    console.error('Error saving email to MongoDB:', error);
    res.status(500).json({ message: 'Error saving email' });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(PORT, () => console.log('Server running on port:', PORT));
