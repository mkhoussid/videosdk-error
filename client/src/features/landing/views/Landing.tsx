import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MeetingProvider, MeetingConsumer, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { startLiveStream } from 'src/features/streaming/redux/actions';
import { IState } from 'src/features/core/redux/reducers';

// Helper function for participant loop.
const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};

const ParticipantView = ({ participantId }) => {
	const webcamRef = React.useRef(null);
	const micRef = React.useRef(null);
	const screenShareRef = React.useRef(null);

	const { displayName, webcamStream, micStream, screenShareStream, webcamOn, micOn, screenShareOn } =
		useParticipant(participantId);

	React.useEffect(() => {
		if (webcamRef.current) {
			if (webcamOn) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(webcamStream.track);

				webcamRef.current.srcObject = mediaStream;
				webcamRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error));
			} else {
				webcamRef.current.srcObject = null;
			}
		}
	}, [webcamStream, webcamOn]);

	React.useEffect(() => {
		if (micRef.current) {
			if (micOn) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(micStream.track);

				micRef.current.srcObject = mediaStream;
				micRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error));
			} else {
				micRef.current.srcObject = null;
			}
		}
	}, [micStream, micOn]);

	React.useEffect(() => {
		if (screenShareRef.current) {
			if (screenShareOn) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(screenShareStream.track);

				screenShareRef.current.srcObject = mediaStream;
				screenShareRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error));
			} else {
				screenShareRef.current.srcObject = null;
			}
		}
	}, [screenShareStream, screenShareOn]);

	return (
		<div key={participantId}>
			<audio ref={micRef} autoPlay />
			{webcamRef || micOn ? (
				<div>
					<h2>{displayName}</h2>
					<video height={'100%'} width={'100%'} ref={webcamRef} autoPlay />
				</div>
			) : null}
			{screenShareOn ? (
				<div>
					<h2>Screen Shared</h2>
					<video height={'100%'} width={'100%'} ref={screenShareRef} autoPlay />
				</div>
			) : null}
			<br />
			<span>
				Mic:{micOn ? 'Yes' : 'No'}, Camera: {webcamOn ? 'Yes' : 'No'}, Screen Share:{' '}
				{screenShareOn ? 'Yes' : 'No'}
			</span>
		</div>
	);
};

const MeetingView = React.memo(() => {
	const [joined, setJoined] = React.useState(false);

	const { join, leave, toggleMic, toggleWebcam, toggleScreenShare, participants } = useMeeting();

	if (!joined) {
		return (
			<button
				onClick={() => {
					join();
					setJoined(true);
				}}
			>
				join meeting
			</button>
		);
	}

	return (
		<div>
			<div>
				<button onClick={leave}>Leave</button>
				<button onClick={toggleMic}>toggleMic</button>
				<button onClick={toggleWebcam}>toggleWebcam</button>
				<button onClick={toggleScreenShare}>toggleScreenShare</button>
			</div>

			{chunk([...participants.keys()]).map((k) => (
				<div key={k} style={{ display: 'flex' }}>
					{k.map((l) => (
						<ParticipantView key={l} participantId={l} />
					))}
				</div>
			))}
		</div>
	);
});

const Landing = React.memo(() => {
	const [loading, setLoading] = React.useState(false);

	const meetingId = useSelector((state: IState) => state.app.streaming.streamConfig.meetingId);
	const videoToken = useSelector((state: IState) => state.app.streaming.streamConfig.videoToken);

	const dispatch = useDispatch();

	const handleClick = React.useCallback(() => {
		dispatch(startLiveStream({ payload: { onStart: () => setLoading(true), onEnd: () => setLoading(false) } }));
	}, []);

	if (!meetingId || !videoToken)
		return (
			<div>
				<button onClick={handleClick}>Go Live</button>
				{loading && <div>LOADING</div>}
			</div>
		);

	return (
		<MeetingProvider
			config={{
				meetingId,
				name: '<Name-of-participant>',
				// participantId: 'Id-of-participant', // optional, auto-generated
				micEnabled: true,
				webcamEnabled: true,
				// maxResolution: '<Maximum-resolution>',
			}}
			token={videoToken}
		>
			<MeetingConsumer>{() => <MeetingView />}</MeetingConsumer>
		</MeetingProvider>
	);
});

export default Landing;
