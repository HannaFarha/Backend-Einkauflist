const express = require('express')
const mongoose = require('mongoose')
const todo = require('./models/model')
const task = require("./models/task")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const cors = require('cors')
//const { config } = require('dotenv')
require('dotenv').config()
let corsOptions = {
  origin: ['https://wrap4friends-hanna-farha.netlify.app'],
}

app.use(cors(corsOptions))

app.get('/', async (request, response) => {

  const tOdo = await todo.find()
  response.json(tOdo)
})

app.get('/task', async (request, response) => {

  const tasks = await task.find()
  response.json(tasks)
})

//post todo
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

//post tasks
app.post('/task', async (request, response) => {
  // Get back the data from the request
  //console.log(request.body)
  const payload = request.body
  try {
    const newTask = await task.create(payload)
    response.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      response.status(400).json({ error, message: 'Duplicate somewhere' })
    } else {
      response.status(500).json({ error, message: 'Something happened maybe on the server' })
    }
  }
})


// app.delete('/:todoId', async (request, response) => {
//   const { todoId } = request.params
//   try {
//     const bookToDelete = await todo.findByIdAndDelete(todoId)
//     response.status(202).json({ message: `${bookToDelete.title} was remove from the db` })
//   } catch (error) {
//     console.log(error)
//     response.status(500).json({ message: 'Something bad happened' })
//   }
// })
app.delete('/:title', async (request, response) => {
  const { title } = request.params;
  try {
    const todoToDelete = await todo.findOneAndDelete({ title });
    response.status(202).json({ message: `${todoToDelete.title} was removed from the db` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Something bad happened' });
  }
});
app.delete('/all/done', async (request, response) => {
  try {
    await todo.deleteMany({});
    response.status(202).json({ message: 'All todos deleted successfully' });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Something bad happened' });
  }
});


//delete task
app.delete('/task/:task', async (request, response) => {
  const { tasks } = request.params;
  try {
    const taskToDelete = await task.findOneAndDelete({ tasks });
    response.status(202).json({ message: `${taskToDelete.task} was removed from the db` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Something bad happened' });
  }
});
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(PORT, () => {
      console.log('Server running on ' + PORT)
      console.log(process.env.ORIGIN)
    })
  })
  .catch(error => {
    console.log('Problem connection to the DB', error)
  })
module.exports = (req, res) => {
  app(req, res);
};