import { AnyAction } from 'redux';
import { SET_STREAM_CONFIG } from './types';

export type TStreamConfig = {
	videoToken: string | null;
	meetingId: string | null;
};

export type IStreamingState = {
	streamConfig: TStreamConfig;
};

const initialState = {
	streamConfig: {
		videoToken: null,
		meetingId: null,
	},
};

const streamingReducer = (state: IStreamingState = initialState, action: AnyAction): IStreamingState => {
	const { type, payload } = action;

	if (type === SET_STREAM_CONFIG) {
		return {
			...state,
			streamConfig: payload,
		};
	} else {
		return {
			...state,
		};
	}
};

export default streamingReducer;
