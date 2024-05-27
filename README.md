# Skipli Front-end Test
## Installation

### Front-end (run on port 3001)

```bash
    cd skipli_fe/
    npm install
    npm start
```

### Back-end (run on port 4000)

#### Firstly

```bash
    cd skipli_be/
    npm install
```
API: http://localhost:4000/API

#### Secondly, you need to have Twilio account, Mail account, Firebase serviceAccount.json and Gemini API

Setup `.env` and `serviceAccount.json` in root back-end's source:
```
# Email API
EMAIL_SERVICE=gmail
EMAIL_USER=Enter your email here
EMAIL_PASS=Enter your app password here

# Twilio API
TWILIO_ACCOUNT_SID=Enter your Twilio Account SID here
TWILIO_AUTH_TOKEN=Enter your Twilio Auth Token here
TWILIO_PHONE_NUMBER=Enter your Twilio Phone Number here

# Gemini API
GOOGLE_API_KEY=Enter your Google API Key here

# Firebase API
FIREBASE_DATABASE_URL=Enter your Firebase Database URL here
```

Create Twilio account at https://www.twilio.com/ to get all `Twilio API`

Create Firebase account at https://firebase.google.com/. to get `FIREBASE_DATABASE_URL` and `serviceAccount.json` (Must rename to serviceAccount.json)

Get `GOOGLE_API_KEY` at https://ai.google.dev/gemini-api

Get `EMAIL_PASS` at https://myaccount.google.com/apppasswords

#### Finally,

```bash
    npm start
```
