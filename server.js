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
	app.use((req, resp, next) => {
		if (!req.secure) {
			console.log('Redirect to HTTPS');
			return resp.redirect('https://' + req.headers.host + req.url);
		}
		next();
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
