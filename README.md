![ways to see image](img/screen.jpg)

# How can I make Facebook chatbot?
This document will shares what I referred during the development for an intermediate level engineers.

Besides, here is [Facebook messenger platform start guide](https://developers.facebook.com/docs/messenger-platform/getting-started)

### 1. Write a Webhook
Webhook is a javascript file to which we will write how the chatbot response to the users. Firstly at this step..  
- Write a webhook to test HTTP server functions with your local server [Facebook Developer document](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

### 2. Deploy the webhook to your favourite server
This step is to define URL that host the webhook by uploading the file in the server and test if the webhook interact with the HTTPS request.

I use Google Cloud Platform, particularly Cloud function.

- Modify network requesting part in the webhook from your local server to the server [GCP sample to handle multiple HTTP methods](https://cloud.google.com/functions/docs/writing/http)
- Upload the file to the server [GCP Cloud function deploy](https://cloud.google.com/functions/docs/tutorials/http)
- Debug...[GC function log](https://cloud.google.com/functions/docs/monitoring/logging)

### 3. Setting up the app at Facebook developer account page
This step is to set app the chatbot app, which process include setting the webhook URL from the step above. 
Overall flow: [Facebook developer doc](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)

### 4. Update the webhook by adding chatbot logics
- Pverall flow: [Facebook developer start guide](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start)
- To AVOID hardcoding the page access token, it is recommended the following.
```javascript
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
```
You can find about process.env  [here](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)
- [sample webhook](sample/sample-webhook.js)

### 5. Activate the app!
Finally we can activate the app after providing the following information. I read the Facebook ones then modified for my app. 
- Data policy: which data to retrieve and for what? etc Need to be hosted in public URL
- Terms of Service: what is this service offer? etc. Need to be hosted in public URL
- Your details as a data retriever (legally required in EU and in this case we need to provid in the developer account page)
- Finally activate your app in the account page :)

### Optional: Train the dataset
You write the chatbot response logic in the webhook. Personally I found [wit.ai](https://wit.ai) is helpful to compose the logic for their pre-trained dataset and to train the dataset with the retrieved user response after connecting with app in the developer account page. 


# License
[MIT License](https://choosealicense.com/licenses/mit/) © [Yukino Kohmoto](http://yukinokoh.github.io/)
