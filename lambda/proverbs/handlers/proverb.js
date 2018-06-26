const { join } = require('path');
const proverbs = require('require-all')({ dirname: join(__dirname, '..', 'data', 'es-ES') });

const getRandomItem = arrayOfItems => {
	let i = 0;
	i = Math.floor(Math.random() * arrayOfItems.length);
	return arrayOfItems[i];
};

const extractTheme = slots => {
	let theme;
	try {
		theme = slots.Theme.resolutions.resolutionsPerAuthority[0].values[0].value.name.toLowerCase();
	} catch (e) {
		console.error('Valid theme slot non found');
	} finally {
		return theme;
	}
};

module.exports = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'ProverbIntent'
		);
	},
	handle(handlerInput) {
		const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const themeName = extractTheme(handlerInput.requestEnvelope.request.intent.slots);

		let speakOutput = '';
		const proverb = proverbs[themeName] && getRandomItem(proverbs[themeName]);
		console.log(`Handling theme...${themeName}`);

		if (proverb) {
			const cardTitle = 'Refrán';
			sessionAttributes.speakOutput = proverb;
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
			return handlerInput.responseBuilder
				.speak(sessionAttributes.speakOutput)
				.withSimpleCard(cardTitle, proverb)
				.getResponse();
		}

		speakOutput = 'Refrán no encontrado';
		sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
		handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
		return handlerInput.responseBuilder
			.speak(sessionAttributes.speakOutput)
			.reprompt(sessionAttributes.repromptSpeech)
			.getResponse();
	},
};
