const bcrypt = require('bcryptjs')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { MongoClient } = require('mongodb')

const date = new Date()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      date.getMilliseconds().toString() +
        '_' +
        date.getHours().toString() +
        date.getMinutes().toString() +
        '-' +
        date.getDate().toString() +
        date.getDay().toString() +
        date.getFullYear().toString() +
        '-' +
        file.originalname.toLowerCase().replace(/\s/g, '-'),
    )
  },
})
const upload = multer({
  storage: storage,
  fileFiter: (req, file, db) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
  limits: {
    fileSize: 5000000,
  },
})

/////////////// DATABASE ///////////////

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
    return res.status(500).json({ message: 'Have some probrlem : ' + err })
  }
}

////////////// ROUTES //////////////

// CREATE
app.post('/api/articles', upload.single('thumbnail'), async (req, res) => {
  const { title, url, content } = req.body
  const article = {
    title,
    url,
    thumbnail: '/uploads/' + req.file.filename,
    content,
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await mongodbConfig(async (db) => {
    const collection = db.collection('articles')
    await collection
      .insertOne(article)
      .then((result) => {
        return res
          .status(201)
          .json({ message: 'Article created', result: result })
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Have some probrlem : ' + err })
      })
  }, res)
})

app.post('/api/signup', async (req, res) => {
  const { name, email } = req.body
  const password = bcrypt.hashSync(req.body.password, 10)
  const user = {
    name,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await mongodbConfig(async (db) => {
    const collection = db.collection('accounts')
    await collection
      .insertOne(user)
      .then((result) => {
        res.status(201).json({ message: 'User created', result: result })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Have some probrlem : ' + err })
      })
  }, res)
})
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body
  await mongodbConfig(async (db) => {
    const collection = db.collection('accounts')
    await collection
      .findOne({ email })
      .then((result) => {
        if (result) {
          const passwordIsValid = bcrypt.compareSync(password, result.password)
          if (passwordIsValid) {
            const token = jwt.sign({ id: result._id }, 'secret', {
              expiresIn: '1h',
            })
            res.status(200).json({
              message: 'Login Success',
              result: {
                email: result.email,
                name: result.name,
                createdAt: result.createdAt,
              },
              token: token,
            })
          } else {
            res.status(401).json({ message: 'Invalid password' })
          }
        } else {
          res.status(401).json({ message: 'Login failed' })
        }
      })
      .catch((err) => {
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

module.exports = app
