const path = require('path');

const applyCommonRegister = async (app, isDev) => {
	app.register(require('fastify-cookie'), {
		secret: 'my-secret', // for cookies signature
		parseOptions: {}, // options for parsing cookies
	});

	app.register(require('fastify-cors'), {
		origin: '*',
		methods: ['POST', 'PUT', 'DELETE'],
		// credentials: true,
	});

	app.register(require('fastify-static'), {
		root: path.join(__dirname, 'client', 'build'),
	});

	app.setNotFoundHandler((request, reply) => {
		reply.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
	});

	app.register(require('fastify-helmet'), { contentSecurityPolicy: false });

	app.register(require('fastify-multer').contentParser);
	app.register(require('fastify-formbody'));
	app.register(require('fastify-qs'), {});
};

module.exports = applyCommonRegister;
