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

		console.log(`Handling theme...${themeName}`);
		const respond = text => {
			const cardTitle = 'Refrán';
			sessionAttributes.speakOutput = text;
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
			return handlerInput.responseBuilder
				.speak(sessionAttributes.speakOutput)
				.withSimpleCard(cardTitle, text)
				.getResponse();
		};

		const themeProverbs = proverbs[themeName];
		if (themeProverbs) {
			const proverb = getRandomItem(themeProverbs);
			return respond(proverb);
		}
		const allProverbs = [].concat.apply([], Object.values(proverbs));
		const nonFoundOutput = 'No reconozco ese tema, pero aquí tienes un refrán igualmente, ';
		const proverb = getRandomItem(allProverbs);
		return respond(`${nonFoundOutput}${proverb}`);
	},
};
