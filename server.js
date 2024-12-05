const express = require('express');
const axios = require('axios');
const dotenv=require('dotenv');
const path = require('path');
const app = express();
dotenv.config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/successful.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'successful.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  function determineStatus(age) {
    return age >= 60 ? 'Senior' : 'Junior';
  }
  

app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;
  const status = determineStatus(age);

  try {
    const response = await axios.post(`${process.env.APP_SCRIPT_URL}`, {
      name,
      email,
      age,
      status
    });
    
    res.redirect("/successful.html");
  } catch (error) {
    console.error('Error submitting data:', error);
    res.status(500).send('Error submitting data');
  }
});


