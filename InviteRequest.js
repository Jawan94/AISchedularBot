/*
    models/InviteRequest.js
    Defines the InviteRequest model
*/

const mongoose = require('mongoose');

const {
  Schema,
} = mongoose.Schema;

const InviteRequestSchema = new Schema({
  eventId: {
    type: String,
  },
  inviteeId: {
    type: String,
  },
  requesterId: {
    type: String,
  },
  status: {
    type: String,
  },
});

const InviteRequest = mongoose.model('inviteRequest', InviteRequestSchema);
module.exports = InviteRequest;
