module.exports = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		//any cleanup logic goes here
		return handlerInput.responseBuilder.getResponse();
	},
};
