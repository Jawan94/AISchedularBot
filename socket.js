const { RtmClient, RTM_EVENTS } = require('@slack/client');
const google = require('googleapis');
const  OAuth2 = google.auth.OAuth2;
const User = require('../models/User');
const token = process.env.SLACK_API_TOKEN || '';
const rtm = new RtmClient(token);
var dialogflow = require('./dialogflow')
rtm.start();


function handleDialogFlowConversation(message, userId) {
  dialogflow.interpretUserMessage(message.text, message.user).then(function(res){
    var {data} = res;
    console.log("DIAGLOGFLOW SAYS", res.data);
    if(data.result.actionIncomplete){
      web.chat.postMessage(message.channel, data.result.fulfillment.speech)
    }
    else{
      web.chat.postMessage(message.channel, 'You asked me to remind you to' + data.result.parameters.description + 'on' +  data.result.parameters.date)
    }
  })
  .catch(function(err){
    console.log("Error sending message to dialgflow", err);
  })
}


rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  // console.log('LOOK HERE Message:', message);
  // rtm.dataStore.getUserById(message.user).name,
  // console.log('Logging rtm.dataStore', rtm.dataStore.getUserById(message.user));
  if(! message.user){
    console.log('Message sent from bot');
    return;
  }
  else{
  web.chat.postMessage()
  const name = rtm.dataStore.getUserById(message.user).name;
  const email = rtm.dataStore.getUserById(message.user).profile.email;
  const slackId = rtm.dataStore.getUserById(message.user).id;
  // console.log('User schema: ', User);
  User.findOne({slackId: slackId}, (err, user) => {
   if (err) {
     const newUser = new User({
       slackId: slackId, // fill this in,
       slackusername: name, // fill this in,
       slackEmail: email, // fill this in,
       slackDmIds: rtm.dataStore.getChannelGroupOrDMById(message.channel).name, // fill this in,
     });
     newUser.save((errSaving) => {
         res.send(errSaving);
       });
     }  else {
       console.log('hello');
       console.log(user);
       // user is found.  Now we have to test if google is setup.
       // google not set up
       // const keys = Object.keys(user.googleAccountInfo);

       // if (user.googleAccountInfo === null) {
       //   const url = oauth2Client.generateAuthUrl({
       //     access_type: 'offline',
       //     prompt: 'consent',
       //     scope: [
       //       'https://www.googleapis.com/auth/userinfo.profile',
       //       'https://www.googleapis.com/auth/calendar',
       //     ],
       //     state: encodeURIComponent(JSON.stringify({
       //       auth_id: req.query.auth_id,
       //     })),
       //   });
       //   res.redirect(url);
       }
   });
 }
});
