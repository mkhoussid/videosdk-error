const routes = require('./routes');

const applyRoutesRegister = (app) => {
	routes.forEach((route, index) => {
		app.route(route);
	});
};

module.exports = applyRoutesRegister;
