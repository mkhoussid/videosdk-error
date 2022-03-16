const { getValidatedMeetingId } = require('./helpers');

exports.goLive = async (req, reply) => {
	try {
		const { videoToken, validatedMeetingId } = await getValidatedMeetingId();

		return reply.send({
			meetingId: validatedMeetingId,
			videoToken,
		});
	} catch (err) {
		console.log('error with goLive', err);

		return reply.code(500).send({ error: err });
	}
};
