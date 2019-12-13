var bookNames;

async function init() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js');
	}

	setTableHeader();

	try {
		handleBookNames(await loadXML('/xmls/bible-book-name.xml'));
	} catch (e) {
		console.log('handleBookNames error :', e);
	}

	for (i = 1; i <= 12; i++) {
		var xmlName = '/xmls/navigator-' + i + '.xml';
		try {
			handleNavigator(await loadXML(xmlName));
		} catch (e) {
			console.log('handleNavigator error :', e);
		}
	}
}

async function loadXML(xmlName, xmlHandler) {
	var res = await fetch(xmlName);
	return (new window.DOMParser()).parseFromString(await response.text(), 'text/xml');
}

function setTableHeader() {
	var header = document.createElement('th');
	header.innerHTML = 'Day';
	document.getElementById("table").appendChild(header);
	header = document.createElement('th');
	header.innerHTML = '4복음서';
	document.getElementById("table").appendChild(header);
	header = document.createElement('th');
	header.innerHTML = '구약';
	document.getElementById("table").appendChild(header);
	header = document.createElement('th');
	header.innerHTML = '시가서';
	document.getElementById("table").appendChild(header);
	header = document.createElement('th');
	header.innerHTML = '신약';

	document.getElementById("table").appendChild(header);
}

function handleBookNames(xml) {
	bookNames = xml.getElementsByTagName('book');
}

function handleNavigator(xml) {
	var i, j;

	var entries = xml.getElementsByTagName('Day');
	for (i = 0; i < entries.length; i++) {
		var day = entries[i].getAttribute('month') + '/' + entries[i].getAttribute('day');
		var row = document.createElement('tr');
		row.innerHTML = '<td>' + day + '</td>';
		var entryCount = entries[i].childNodes.length
		var entry = entries[i].firstChild;
		for (j = 0; j < entryCount; j++) {
			if (entry.nodeType != 1) { /* 1 means ELEMENT_NODE */
				entry = entry.nextSibling;
				continue;
			}
			var book = entry.getAttribute('book');
			var chapter = entry.getAttribute('chapter');
			var verse = entry.getAttribute('verse');
			if (verse === '0') {
				if (book === '19') {
					row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-long') + ' ' + chapter + '편</td>';
				}
				else {
					row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-long') + ' ' + chapter + '장</td>';
				}
			}
			else {
				row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-long') + ' ' + chapter + ':' + verse + '</td>';
			}
			entry = entry.nextSibling;
		}
		document.getElementById("table").appendChild(row);
	}
}
