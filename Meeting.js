/*
    models/Meeting.js
    Defines the Meeting model
*/

const mongoose = require('mongoose');

const {
  Schema,
} = mongoose.Schema;

const MeetingSchema = new Schema({
  day: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  invitees: {
    type: Array,
    required: true,
  },
  subject: {
    type: String,
  },
  location: {
    type: String,
  },
  meetingLength: {
    type: Number,
  },
  googleCalendarFields: {
    type: Object,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  requesterId: {
    type: String,
  },
});

const Meeting = mongoose.model('meeting', MeetingSchema);
module.exports = Meeting;
