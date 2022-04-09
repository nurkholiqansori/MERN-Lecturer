const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()
const port = 8000
const origin = 'http://localhost:3000'

const mongodbConfig = async (operation, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db('mern_stack')
    await operation(db)
    client.close()
  } catch (err) {
    res.status(500).json({ message: 'Have some probrlem : ' + err })
  }
}

app.use(bodyParser.json())
app.use(cors(origin))

// CREATE
app.post('/api/articles', async (req, res) => {
  const { title, url, thumbnail, content } = req.body
  const article = {
    title,
    url, // name
    thumbnail, // img
    content,
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await mongodbConfig(async (db) => {
    const collection = db.collection('articles')
    await collection.insertOne(article).then((result) => {
      res.status(201).json({ message: 'Article created', result: result })
    }).catch((err) => {
      res.status(500).json({ message: 'Have some probrlem : ' + err })
    })
  }, res)
})
app.post('/api/article/:name/add-comment', async (req, res) => {
  const { email, text } = req.body
  const articleName = req.params.name

  mongodbConfig(async (db) => {
    const articleDb = await db
      .collection('post_all')
      .findOne({ name: articleName })
    await db.collection('post_all').updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleDb.comments.concat({ email, text }),
        },
      },
    )
    const updatedArticleDb = await db
      .collection('post_all')
      .findOne({ name: articleName })
    res.status(200).json(updatedArticleDb)
  }, res)
})

// READ
app.get('/api/articles', async (req, res) => {
  await mongodbConfig(async (db) => {
    const articles = await db.collection('articles').find().toArray()
    res.status(200).json(articles)
  }, res)
})
app.get('/api/article/:url', async (req, res) => {
  mongodbConfig(async (db) => {
    const articleName = req.params.url
    const articleDb = await db
      .collection('articles')
      .findOne({ url: articleName })
    res.status(200).json(articleDb)
  }, res)
})

app.listen(port, () => console.log('Server has been running on port ' + port))
