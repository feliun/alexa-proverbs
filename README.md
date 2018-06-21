# alexa-workshop

A workshop to develop Alexa skills using lambdas and the serverless framework

## Get your Amazon credentials

- Login with Amazon is an OAuth2.0 single sign-on (SSO) system using your Amazon.com account.
- To get your credentials, log in to the Amazon Developer Console, go to Login with Amazon from APPS & SERVICES, and then Create a New Security Profile.
- Go to the Web Settings of the new security profile.
- `Allowed Origins` can be empty.
- Enter http://localhost:3000 in `Allowed Return URLs`. This port number can be changed with serverless.yml, so if you want to change this, please do so.
- Remember your Client ID and Client Secret of the new security profile, as well as Vendor ID. You can check your Vendor ID at [here](https://developer.amazon.com/mycid.html).
- You only need to do this process once. You can continue to use the same credentials as long as you use the same account.

### Setup serverless

`npm i serverless -g`

- check the serverless.yml file
- fill secrets.json with your Amazon account details
- install `sls plugin install -n serverless-alexa-skills`
- git checkout step-2
