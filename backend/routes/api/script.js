const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const client_secret="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"
const client_id="949104821865-dgfml9j09173p2hgda993vhd8cuchs8e.apps.googleusercontent.com"
const redirect_uri="http://localhost:8000/api/users/redirect"

async function getRefreshToken() {
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uri);

  const authorizationUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });

  console.log(`Visit this URL to authenticate with Google: ${authorizationUrl}`);
  console.log('Enter the code from the response: ');

  const code = await new Promise((resolve, reject) => {
    process.stdin.resume();
    process.stdin.on('data', buffer => {
      resolve(buffer.toString().trim());
    });
  });

  const { tokens } = await oAuth2Client.getToken(code);
  console.log(`Refresh Token: ${tokens.refresh_token}`);
}
http://localhost:8000/api/users/redirect?code=4%2F0AWtgzh4MiBkpsgJq1Uu2I0LP-xuynAQB6BaiAjCjDOL7tyJ3BihzZSv5j3-bL_rW0WOwMw&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send
getRefreshToken();