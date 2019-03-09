require('dotenv').config();
const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

function handleGET (req, res) {
  
  // Parse the query params
  var VERIFY_TOKEN = "YOUR TOKEN GOES HERE";

  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    }else{
      res.sendStatus(403);
    }
  }else{
    res.sendStatus(403);
  }
}

function handlePOST (req, res) {
  // Do something with the PUT request
  var  body = req.body;
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      var webhook_event = entry.messaging[0];
      console.log(webhook_event);
       // Get the sender PSID
      var sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}



// Handles messages events
function handleMessage(sender_psid, received_message) {
  var response;
  const greeting = firstEntity(received_message.nlp, 'greetings');
  const sentiment = firstEntity(received_message.nlp, 'sentiment');
  const bye = firstEntity(received_message.nlp, 'bye');
  const intent = firstEntity(received_message.nlp, 'intent');

  if(greeting && greeting.confidence > 0.8) {
    response = {"text": 'Hi'};
  // }else if(intent && intent.value=='temperature_set'){
  //   response = {"text": 'set temperature (test)'};
  }else if(bye && bye.confidence > 0.8){
    console.log('value :' + intent.value + '/text: ' + received_message.text);
    response = {"text": 'bye'};
  }else if(sentiment && sentiment.confidence > 0.8 && sentiment.value =='positive'){
    response = {"text": 'it sounds positive!'};
  }else if(intent && intent.confidence > 0.8 && intent.value == 'denial'){
    console.log('value :' + intent.value + '/text: ' + received_message.text);
    var denial_suggest = ['It may oversight about ---', 
                          'May be little adjustment of ---?',
                          'It can be done in another way, like --?',
                          'Let me understand your intention to --',
                          'It may assumed too much about ---.',
                          'Let\'s talk about it again.'];
    var suggest_num = Math.floor(Math.random() * 6);
    response = {"text": 'how about to say... \n"' + denial_suggest[suggest_num] +'"'};   
  }else if(intent && intent.confidence > 0.8 && intent.value == 'family-ng'){
    console.log('value :' + intent.value + '/text: ' + received_message.text);
    var family_suggest = ['How is your family?',
                          'How is your home?'];
    var suggest_num = Math.floor(Math.random() * 2); 
    response = {"text": 'how about to say... \n"' + family_suggest[suggest_num] +'"'};   

  }else if(received_message.text) {    
    console.log('value :' + intent.value + '/text: ' + received_message.text);
    // Create the payload for a basic text message
    var yet =['I don\'t have any suggestions for that yet.',
              'It\'s great habbit to think before saying a word.',
              'Sometime people need to think by themselves',
              'I\'ll think about that'];
    var suggest_num = Math.floor(Math.random() * 4);
    response = {"text": yet[suggest_num]};
  } 
  /* else if (received_message.attachments) {
    // Gets the URL of the message attachment
    var attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {"type": "postback","title": "Yes","payload": "yes",},
              {"type": "postback","title": "No","payload": "no",}
            ],
          }]
        }
      }
    };
  }*/  
  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  var response;
  // Get the payload for the postback
  var payload = received_postback.payload;
  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" };
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image."};
  }
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  var request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }; 
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}



function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloHttp = (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'POST':
      handlePOST(req, res);
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};
