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

	var entries = xmlDoc.getElementsByTagName('Day');
	for (i = 0; i < entries.length; i++) {
		var day = entries[i].getAttribute('month') + '/' + entries[i].getAttribute('day');
		var row = document.createElement('tr');
		row.innerHTML = '<td>' + day + '</td>';
		var entryCount = entries[i].childNodes.length
		var entry = entries[i].firstChild;
		for (j = 0; j < entryCount; j++) {
			if (entry.nodeType == ELEMENT_NODE) {
				var book = entry.getAttribute('book');
				var chapter = entry.getAttribute('chapter');
				var verse = entry.getAttribute('verse');
				row.innerHTML += '<td>' + book + ' ' + chapter + ':' + verse + '</td>';
			}
			entry = entry.nextSibling;
		}
			/*
			var entry;
			switch(j) {
				case 0:
					entry = entries[i].getElementsByTagName('The-Four-Gospels')[0];
					break;
				case 1:
					entry = entries[i].getElementsByTagName('Other-New-Testament')[0];
					break;
				case 2:
					entry = entries[i].getElementsByTagName('The-Books-of-Poetry')[0];
					break;
				case 3:
					entry = entries[i].getElementsByTagName('Other-Old-Testament')[0];
					break;
			}
			var book = entry.getElementsByTagName('book')[0].firstChild.data;
			var chapter = entry.getElementsByTagName('chapter')[0].firstChild.data;
			var verse = entry.getElementsByTagName('verse')[0].firstChild.data;
			row.innerHTML += '<td>' + book + ' ' + chapter + ':' + verse + '</td>';
			*/
		}

		document.getElementById("table").appendChild(row);
	}
}
