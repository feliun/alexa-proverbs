/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const { join } = require('path');

const handlers = require('require-all')({ dirname: join(__dirname, 'handlers') });
const requestHandlers = Object.keys(handlers)
	.filter(handlerName => handlerName !== 2)
	.map(handlerName => ({ [handlerName]: handlers[handlerName] }));

const skillBuilder = Alexa.SkillBuilders.custom();

module.exports.tellMeAProverb = skillBuilder
	.addRequestHandlers(...requestHandlers)
	.addErrorHandlers(handlers.error)
	.lambda();
