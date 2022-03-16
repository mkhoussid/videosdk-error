const { authController } = require('../controllers');

const routes = [
	{
		method: 'POST',
		url: '/api/login',
		handler: authController.login,
		schema: {
			body: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: { type: 'string' },
					password: { type: 'string' },
				},
			},
		},
	},
	{
		method: 'GET',
		url: '/api/logout',
		handler: authController.logout,
	},
	{
		method: 'POST',
		url: '/api/register',
		handler: authController.register,
		schema: {
			body: {
				type: 'object',
				required: ['email', 'password', 'name'],
				properties: {
					email: { type: 'string' },
					password: { type: 'string' },
					name: { type: 'string' },
				},
			},
		},
	},
];

module.exports = routes;
