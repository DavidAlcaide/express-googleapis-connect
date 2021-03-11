# express-googleapis-connect
## _Establish connection with some Google Services trough their APIs_

## Getting token
The proccess to get a valid token to work with the different Google APIs consist on the followinfg steps:
1. Create a new project from the Google Developers console.
2. Turn on as many APIs as you need from the panel section.
3. In resulting dialog click DOWNLOAD CLIENT CONFIGURATION and save the file credentials.json to your working directory.
4. We need to create an OAuth2Client using the method OAuth2 from the client library "googleapis"
5. Once we have an OAuthClient, we need to generate a token.json file. To do this, we must first generate an AuthUrl which is a url for consent page landing.
6. From the "AuthPage", we have to accept an consent with our user Google Account. This page will redirect us to another page (included in the redirectUris from the credentials.json file) and give us, in the url the value of the code that we are going to use for generating the token.
7. The previous code is going to be saved in a secret file named ".token.json".
8. With the content of the file ".token.json" and the method getToken of the OAuth2Client, and once we have it we save it in a file named ""token.json". -> __With this token, we can set the credentials of the OAuthClient with which we can execute requests to the APIs__.

## Usage

```sh
npm i
npm run build
npm run dev
```
## License
MIT
