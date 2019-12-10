function loadDoc() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myFunction(this);
		}
	};
	req.open("GET", "navigator.xml", true);
	req.send();
}

function myFunction(xml) {
	var i, j;
	var xmlDoc = xml.responseXML;

	document.getElementById("table").appendChild('<th>Day</th><th>4복음서</th><th>구약</th><th>시가서</th><th>신약</th>');
	var entries = xmlDoc.getElementsByTagName('Day');
	for (i = 0; i < entries.length; i++) {
		var day = entries[i].getAttribute('month') + '/' + entries[i].getAttribute('day');
		var row = '<tr>';
		row += '<td>' + day + '</td>';
		for (j = 0; j < 4; j++) {
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
			row += '<td>' + book + ' ' + chapter + ':' + verse + '</td>';
		}
		row += '</tr>';

		document.getElementById("table").appendChild(row);
	}
}
