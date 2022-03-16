const generateResponse = ({ code = 200, level = 'info', inputErrors, data }) => ({
	code,
	level,
	inputErrors,
});

module.exports = {
	generateResponse,
};
