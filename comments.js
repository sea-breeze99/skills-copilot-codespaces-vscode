// Create web server
// Create a form
// Submit form
// Display the data in the browser
// Create a comments page
// Display all the comments

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
  const comment = req.body.comment;
  fs.appendFileSync('comments.txt', comment + '\n');
  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  let comments = fs.readFileSync('comments.txt', 'utf8');
  comments = comments.split('\n').filter((comment) => comment !== '');
  res.send(
    comments
      .map((comment) => `<div>${comment}</div>`)
      .join('')
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});