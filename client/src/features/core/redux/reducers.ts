import { combineReducers, Action } from 'redux';
import { ThunkAction as ReduxThunkAction } from 'redux-thunk';

import streamingReducer, { IStreamingState } from 'src/features/streaming/redux/reducer';

export type ThunkAction = ReduxThunkAction<void, IState, unknown, Action<string>>;

export interface IState {
	app: {
		streaming: IStreamingState;
	};
}

export default combineReducers<IState>({
	app: combineReducers({
		streaming: streamingReducer,
	}),
});
