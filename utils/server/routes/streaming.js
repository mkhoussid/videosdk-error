const { streamingController } = require('../controllers');

const routes = [
	{
		method: 'GET',
		url: '/api/streaming/go-live',
		handler: streamingController.goLive,
	},
];

module.exports = routes;
