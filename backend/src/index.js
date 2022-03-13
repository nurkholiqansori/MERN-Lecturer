const express = require('express');
const bodyParser = require('body-parser');

const articleDatabase = {
  "learn-react" : {
    comments: []
  }
}


const app = express();

app.use(bodyParser.json())

app.post('/article/:name/add-comment', (req, res) => {
  const {email, text} = req.body;
  const articleName = req.params.name;

  articleDatabase[articleName].comments.push({ email, text});
  res.status(200).send(articleDatabase[articleName]);
})

app.listen(8000, () => console.log('Server has been running on port 8000'))
