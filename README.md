![ways to see image](img/screen.jpg)

# About this project
This is a  [Facebook messenger chatbot](https://yukinokoh.github.io/ways2say/) to give feedback to what the user is about to say. The background of this idea is increasing diversity around. I notice sometimes people say something offensive to another without actually knowing it is not a nice way to say. This app is for such users to be aware and suggests alternative ways to say. 

# How can I make Facebook chatbot?
This document shares what I referred during this chatbot development for intermediate level engineers. Besides, here is [start guide](https://developers.facebook.com/docs/messenger-platform/getting-started) from Facebook, which was helpful!

### 1. Write a webhook
Webhook is a javascript file to which we will write how the chatbot responses to the users. At this step... 
- Write a webhook to test HTTP server functions with your local server: [Facebook Developer doc](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

### 2. Deploy the webhook to your favorite server
This step is to define URL that hosts the webhook. I use Google Cloud Platform, particularly Cloud function.

- Modify the webhook and upload it to the server: [GCP sample to handle multiple HTTP methods](https://cloud.google.com/functions/docs/writing/http)
- Debug...: [GC function logs](https://cloud.google.com/functions/docs/monitoring/logging)

### 3. Setting up the app at Facebook developer account page
This step is to set up the chatbot app. 
- [Facebook developer doc](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)

### 4. Write chatbot logics to the webhook
- [Facebook developer doc](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start)
- About `process.env` in this [medium article](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)
- [Sample webhook](sample/sample-webhook.js)

### 5. Activate the app!
Activate the app after providing the following information.
- Data policy: which data to retrieve and for what? etc Need to be hosted in public URL
- Terms of Service: what is this service offer? etc. Need to be hosted in public URL
- The data retriever info: Legal requirement defined in GDPR. Section to fill in the developer account page
- Finally, activate your app in the account page :)

### Optional: Train the dataset
I found [wit.ai](https://wit.ai) is helpful to compose the logic, because...
- It has their pre-trained dataset 
- It provides functions to train the dataset with the retrieved user response. 


© [Yukino Kohmoto](http://yukinokoh.github.io/)
