const getCookieConfig = (numberOfDaysToAdd = 0) => {
	const date = new Date();
	const expires = date.setDate(date.getDate() + numberOfDaysToAdd);

	const cookieConfig = {
		expires,
		path: '/',
	};

	if (process.env.NODE_ENV !== 'production') {
		cookieConfig.domain = 'localhost';
		cookieConfig.sameSite = 'lax';
	}

	return cookieConfig;
};

module.exports = getCookieConfig;
