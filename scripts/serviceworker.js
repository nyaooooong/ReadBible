var cacheName = 'readbible-v1';
var appShellFiles = [
	'/index.html',
	'/scripts/script.js',
	'/scripts/service-worker.js',
	'/icons/menu_book-32px.png',
	'/icons/menu_book-48px.png',
	'/icons/menu_book-64px.png',
	'/icons/menu_book-96px.png',
	'/icons/menu_book-128px.png',
	'/icons/menu_book-168px.png',
	'/icons/menu_book-192px.png',
	'/icons/menu_book-256px.png',
	'/icons/menu_book-512px.png'
];

var contentFiles = [
	'/xmls/navigator-1.xml',
	'/xmls/navigator-2.xml',
	'/xmls/navigator-3.xml',
	'/xmls/navigator-4.xml',
	'/xmls/navigator-5.xml',
	'/xmls/navigator-6.xml',
	'/xmls/navigator-7.xml',
	'/xmls/navigator-8.xml',
	'/xmls/navigator-9.xml',
	'/xmls/navigator-10.xml',
	'/xmls/navigator-11.xml',
	'/xmls/navigator-12.xml'
];

var contentToCache = appShellFiles.concat(contentFiles);

// Installing Service Worker
self.addEventListener('install', function(e) {
	console.log('[Service Worker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(contentToCache);
		})
	);
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(r) {
			console.log('[Service Worker] Fetching resource: '+e.request.url);
			return r || fetch(e.request).then(function(response) {
				return caches.open(cacheName).then(function(cache) {
					console.log('[Service Worker] Caching new resource: '+e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});
