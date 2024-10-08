const express = require('express')
const mongoose = require('mongoose')
const todo = require('./models/model')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const cors = require('cors')

let corsOptions = {
   origin : ['http://localhost:3000'],
}

app.use(cors(corsOptions))

app.get('/', async (request, response) => {
  
  const tOdo = await todo.find()
  response.json(tOdo)
})

  // app.get('/api/:todoId', async (request, response) => {
  //   const { bookId } = request.params

  //   const oneBook = await todo.findById(bookId)

  //   response.json(oneBook)
  // })


app.post('/todo', async (request, response) => {
  // Get back the data from the request
  console.log(request.body)
  const payload = request.body
  try {
    const newTodo = await todo.create(payload)
    response.status(201).json(newTodo)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      response.status(400).json({ error, message: 'Duplicate somewhere' })
    } else {
      response.status(500).json({ error, message: 'Something happened maybe on the server' })
    }
  }
})

// app.put('/api/books/:bookId', async (request, response) => {
//   console.log(request.body)
//   const payload = request.body
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(request.params.bookId, payload, { new: true })
//     response.status(202).json(updatedBook)
//   } catch (error) {
//     console.log(error)
//     response.status(500).json({ message: 'Something bad happened' })
//   }
// })

app.delete('/:todoId', async (request, response) => {
  const { todoId } = request.params
  try {
    const bookToDelete = await todo.findByIdAndDelete(todoId)
    response.status(202).json({ message: `${bookToDelete.title} was remove from the db` })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Something bad happened' })
  }
})

mongoose
  .connect("mongodb://127.0.0.1:27017/Mongo")
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(3100, () => {
      console.log('Server running on http://localhost:3000')
    })
  })
  .catch(error => {
    console.log('Problem connection to the DB', error)
  })