const mongoose  = require('mongoose')


const taskSchema = new mongoose.Schema(
  {
   task: String,
   
  },{
    
    timestamps: true,
  })

const Task = mongoose.model('Task', taskSchema)

module.exports =Task
