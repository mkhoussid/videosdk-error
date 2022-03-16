const axios = require('axios');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');

const API_KEY = 'd7cd38d1-a11a-487b-86ea-2bf4fe55b54a';
const SECRET_KEY = '5bb7e8d000f0c940fe4f2cf625a6d80a77d76dbdfae34dcf3c72f0ac286d695c';

const getVideoToken = async () => {
	try {
		const videoToken = await jwt.sign(
			{
				apikey: API_KEY,
			},
			SECRET_KEY,
			{
				algorithm: 'HS256',
				expiresIn: '24h',
				jwtid: uuid4(),
			},
		);

		return videoToken;
	} catch (err) {
		console.log('err caught getting stream token', err);

		throw err;
	}
};

const getMeetingId = async ({ videoToken }) => {
	try {
		const {
			data: { meetingId },
		} = await axios({
			url: 'https://api.videosdk.live/api/meetings',
			method: 'POST',
			headers: { Authorization: videoToken, 'Content-Type': 'application/json' },
			body: JSON.stringify({ region: 'en-US' }),
		});

		return meetingId;
	} catch (err) {
		console.log('err caught getting meeting id', err);

		throw err;
	}
};

const getValidatedMeetingId = async () => {
	try {
		const videoToken = await getVideoToken();
		const meetingId = await getMeetingId({ videoToken });

		// TODO, optional
		// const VIDEOSDK_API_ENDPOINT = `${LOCAL_SERVER_URL}/validate-meeting/${meetingId}`;
		// const options = {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ token }),
		// };
		// const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
		// 	.then(async (result) => {
		// 		const { meetingId } = await result.json();
		// 		return meetingId;
		// 	})
		// 	.catch((error) => console.log('error', error));

		return { videoToken, validatedMeetingId: meetingId };
	} catch (err) {
		console.log('err caught getting meeting id', err);

		throw err;
	}
};

module.exports = {
	getValidatedMeetingId,
};
