function loadDoc() {
	setTableHeader();


	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			handleXML(this);
		}
	};
	req.open("GET", "navigator.xml", true);
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

function handleXML(xml) {
	var i, j;
	var xmlDoc = xml.responseXML;

	var bookNames = xmlDoc.getElementsByTagName('book');
	var entries = xmlDoc.getElementsByTagName('Day');
	for (i = 0; i < entries.length; i++) {
		var day = entries[i].getAttribute('month') + '/' + entries[i].getAttribute('day');
		var row = document.createElement('tr');
		row.innerHTML = '<td>' + day + '</td>';
		var entryCount = entries[i].childNodes.length
		var entry = entries[i].firstChild;
		for (j = 0; j < entryCount; j++) {
			if (entry.nodeType == 1) { /* 1 means ELEMENT_NODE */
				var book = entry.getAttribute('book');
				var chapter = entry.getAttribute('chapter');
				var verse = entry.getAttribute('verse');
				if (verse === '0') {
					if (book === '19') {
						row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-short') + ' ' + chapter'편</td>';
					}
					else {
						row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-short') + ' ' + chapter'장</td>';
					}
				}
				else {
					row.innerHTML += '<td>' + bookNames[book-1].getAttribute('Korean-short') + ' ' + chapter + ':' + verse + '</td>';
				}
			}
			entry = entry.nextSibling;
		}
		document.getElementById("table").appendChild(row);
	}
}
