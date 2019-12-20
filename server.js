'use strict';

const express = require('express');

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
	const app = express();

	// Redirect HTTP to HTTPS,
	// Enable reverse proxy support in Express. This causes the
	// the "X-Forwarded-Proto" header field to be trusted so its
	// value can be used to determine the protocol. See 
	// http://expressjs.com/api#app-settings for more details.
	app.enable('trust proxy');
	app.use((req, resp, next) => {
		if (req.secure) {
			next();
		}
		else {
			console.log('Redirect to HTTPS');
			return resp.redirect('https://' + req.headers.host + req.url);
		}
	});

	// Logging for each request
	app.use((req, resp, next) => {
		const now = new Date();
		const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
		const path = `"${req.method} ${req.path}"`;
		const m = `${req.ip} - ${time} - ${path}`;
		// eslint-disable-next-line no-console
		console.log(m);
		next();
	});

	// Handle requests for static files
	app.use(express.static('public'));

	// Start the server
	return app.listen('8000', () => {
		// eslint-disable-next-line no-console
		console.log('Local DevServer Started on port 8000...');
	});
}

startServer();
