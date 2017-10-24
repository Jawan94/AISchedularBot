/*
    models/Task.js
    Defines the Task model
*/

const mongoose = require('mongoose');
const {
  Schema,
} = mongoose.Schema;

const TaskSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  eventId: {
    type: String,
  },
  requesterId: {
    type: String,
  },
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
