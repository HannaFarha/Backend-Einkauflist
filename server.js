const express = require('express')
const mongoose = require('mongoose')
const todo = require('./models/model')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const cors = require('cors')
//const { config } = require('dotenv')
require('dotenv').config()
let corsOptions = {
   origin : ['http://localhost:3000'],
}

app.use(cors(corsOptions))

app.get('/', async (request, response) => {
  
  const tOdo = await todo.find()
  response.json(tOdo)
})


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
const PORT=process.env.PORT

mongoose
  .connect("mongodb://127.0.0.1:27017/Mongo")
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(PORT||3100, () => {
      console.log('Server running on '+  PORT)
    })
  })
  .catch(error => {
    console.log('Problem connection to the DB', error)
  })
  