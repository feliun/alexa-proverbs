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

### Authenticate with Amazon

Execute `sls alexa auth`.
This command opens the login page of Amazon.com in your browser. You will be redirected to localhost:3000 after authenticating. If the authentication is successful, you'll see the message: "Thank you for using Serverless Alexa Skills Plugin!!".

- **NOTE**: The security token expires in 1 hour. Therefore, if an authentication error occurs, please re-execute the command.

## Creating our skill

Run the following command: `sls alexa create --name $YOUR_SKILL_NAME --locale $YOUR_SKILL_LOCALE --type $YOUR_SKILL_TYPE`

These are descriptions of the options:

- name: Name of the skill
- locale: Locale of the skill (en-US for English, ja-JP for Japanese and so on)
- type: Type of the skill (custom or smartHome or video)

## Updating the manifest

A manifest is initially set for the skill. You can check the manifest with the following command:
`sls alexa manifests`
Copy [Skill ID] and [Skill Manifest] and paste it to serverless.yml.

Execute the following command to update the manifest after updating your serverless.yml (or you can use the --dryRun option to check the difference between the local setting and the remote setting without updating):
`sls alexa update`
You can see the format of the manifest [here](https://developer.amazon.com/docs/smapi/skill-manifest.html#sample-skill-manifests);

- git checkout step-3

## Building an interaction model

The skill does not have an interaction model at first, so you'll need to write an interaction model definition to serverless.yml.

You can see the format of the interaction model [here])(https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html).

Execute the following command to build the model after updating your serverless.yml (and you can also use the --dryRun option with this command): `sls alexa build`

Then, you can check the model like so: `sls alexa models`

git checkout step-4
