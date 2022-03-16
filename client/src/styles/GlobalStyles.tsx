import * as React from 'react';
import { css, Global } from '@emotion/react';

export default (
	<Global
		styles={css`
			* {
				outline: none;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			html {
				height: 100%;
				font-family: 'Noto';
			}
			body {
				height: 100%;
			}
			#root {
				height: 100%;
			}
			.auth-textfield {
				margin: 1rem;
			}
			.post {
				width: 220px;
				height: 80px;
			}
			.post .avatar {
				float: left;
				width: 52px;
				height: 52px;
				background-color: #ccc;
				border-radius: 25%;
				margin: 8px;
				background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
				background-size: 600px;
				animation: shine-avatar 1.6s infinite linear;
			}
			.post .line {
				float: left;
				width: 140px;
				height: 16px;
				margin-top: 12px;
				border-radius: 7px;
				background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
				background-size: 600px;
				animation: shine-lines 1.6s infinite linear;
			}
			.post .avatar + .line {
				margin-top: 11px;
				width: 100px;
			}
			.post .line ~ .line {
				background-color: #ddd;
			}

			@keyframes shine-lines {
				0% {
					background-position: -100px;
				}
				40%,
				100% {
					background-position: 140px;
				}
			}
			@keyframes shine-avatar {
				0% {
					background-position: -32px;
				}
				40%,
				100% {
					background-position: 208px;
				}
			}
		`}
	/>
);
