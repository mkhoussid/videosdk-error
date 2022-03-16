const fastify = require('fastify');
const { initServer } = require('./utils');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5002;

const app = fastify({
	// logger: isDev,
});

const start = async (app) => {
	try {
		initServer(app, isDev);

		await app.ready(async (err) => {
			if (err) throw err;
		});

		app.listen(PORT, '::', (err, address) => {
			if (err) throw err;

			app.log.info(`Server listening on port ${address}`);
		});
	} catch (err) {
		console.log('Error caught at boot', err);
		app.log.error(err);

		process.exit(1);
	}
};

start(app);
