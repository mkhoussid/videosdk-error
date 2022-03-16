import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { GlobalStyles } from './styles';
import 'src/assets/styles.css';

import store from './features/core/redux/store';

ReactDOM.render(
	<Provider store={store}>
		<EmotionThemeProvider theme={{}}>
			{GlobalStyles}
			<Router>
				<App />
			</Router>
		</EmotionThemeProvider>
	</Provider>,
	document.getElementById('root'),
);
