const express = require('express');
const cors = require('cors');
const demoData = require('./data/demoData');

const app = express();
app.use(cors());

app.get('/api/demo', (req, res) => {
  res.json(demoData);
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
