const express = require('express');
const mongoose = require('mongoose');
const google = require('google')

const app = express();
if (!process.env.MONGODB_URI) {
  throw new Error('Did not source env.sh!');
}
mongoose.connect(process.env.MONGODB_URI);

require('./websocket/socket');
app.get('/setup', function(req, res) {
  var url = google.generateAuthUrl()
  res.redirect(url)
  res.send('Thanks for trying to setup!')
})

app.get('/google/callback', function(req, res) {
  google.getToken(req.query.code).then(function(tokens){
    res.send(tokens)
  }).catch(function(err){
    console.log('error retreiving token', err);
    res.status(500).send('Sorry, that didnt work'  )
  })
  res.send('your code is ' + req.query.code)
})

app.set('PORT', process.env.PORT || 3000);
app.listen(app.get('PORT'), () => {
  console.log(`Server for SchedulerBot running on port ${app.get('PORT')}!`);
});
