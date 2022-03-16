const applyCommonRegister = require('./applyCommonRegister');
const applyRoutesRegister = require('./applyRoutesRegister');

const initServer = (app, isDev) => {
	applyCommonRegister(app, isDev);
	applyRoutesRegister(app);
};

module.exports = initServer;
