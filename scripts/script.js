var bookNames;

function init() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/scripts/serviceworker.js');
	}

	setTableHeader();

	loadXML('/xmls/bible-book-name.xml', handleBookNames);

	for (i = 1; i <= 12; i++) {
		var xmlName = '/xmls/navigator-' + i + '.xml';
		loadXML(xmlName, handleNavigator);
	}
}

function loadXML(xmlName, xmlHandler) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			xmlHandler(this);
		}
	};
	req.open("GET", xmlName, true);
	req.send();
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
	var xmlDoc = xml.responseXML;
	var bookNames = xmlDoc.getElementsByTagName('book');
}

function handleNavigator(xml) {
	var i, j;
	var xmlDoc = xml.responseXML;

	var entries = xmlDoc.getElementsByTagName('Day');
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
