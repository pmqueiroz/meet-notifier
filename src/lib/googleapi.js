const { google } = require('googleapis')
const { OAuth2 } = google.auth

require('dotenv').config()

const oAuth2Client = new OAuth2(
   process.env.CLIENT_ID,
   process.env.SECRET_KEY
)

oAuth2Client.setCredentials({
   refresh_token: process.env.REF_TK
})

/* const calendar = google.calendar({
   version: 'v3',
   auth: oAuth2Client
})
*/
