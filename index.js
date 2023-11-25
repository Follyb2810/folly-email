const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const emailModel = require('./model/EmailModel');
const connectDB = require('./Config/db');

env.config();
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/email', async (req, res) => {
  const { email, name, message } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    if (!email || !name || !message) {
      return res.status(400).json({ error: 'All input fields are required' });
    }

    const newEmail = new emailModel({ email, name, message });

    await newEmail.save();

    res.status(200).json({ message: 'Thank you for contacting us!' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const newEmail = new emailModel({ email });

    await newEmail.save();

    res.status(200).json({ message: 'Thank you for subscribing to our Newsletter!' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(PORT, () => console.log('Server running on port:', PORT));
