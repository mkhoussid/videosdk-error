import { ThunkAction } from 'src/features/core/redux/reducers';
import { httpClient } from 'src/features/core/services/httpClient';
import { TStreamConfig } from './reducer';
import { SET_STREAM_CONFIG } from './types';

type TSetStreamConfig = {
	payload: TStreamConfig;
};
export const setStreamConfig =
	({ payload }: TSetStreamConfig): ThunkAction =>
	(dispatch): void => {
		dispatch({
			type: SET_STREAM_CONFIG,
			payload,
		});
	};

type TStartLiveStream = {
	payload: { onStart: (...params: any[]) => void; onEnd: (...params: any[]) => void };
};
export const startLiveStream =
	({ payload: { onStart, onEnd } }: TStartLiveStream): ThunkAction =>
	async (dispatch): Promise<void> => {
		try {
			onStart();

			const {
				data: { videoToken, meetingId },
			} = (await httpClient({
				url: '/api/streaming/go-live',
			})) as {
				data: {
					videoToken: string;
					meetingId: string;
				};
			};

			dispatch(
				setStreamConfig({
					payload: {
						meetingId,
						videoToken,
					},
				}),
			);
		} catch (err) {
			console.log('err caught', err);
		} finally {
			onEnd();
		}
	};
