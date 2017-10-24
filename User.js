/*
    models/User.js
    Defines the User model
*/

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  googleAccountInfo: {
    type: Object,
  },
  meetingLength: {
    type: Number,
    default: 30,
  },
  slackId: {
    type: String,
  },
  slackusername: {
    type: String,
  },
  slackEmail: {
    type: String,
  },
  slackDmIds: {
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);
