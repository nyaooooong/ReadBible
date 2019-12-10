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

	var entries = xmlDoc.getElementsByTagName('Day');
	for (i = 0; i < entries.length; i++) {
		var day = entries[i].getAttribute('month') + '/' + entries[i].getAttribute('day');
		var row = '<tr>';
		row += '<td>' + day + '</td>';
		for (j = 0; j < 4; j++) {
			var entry;
			switch(j) {
				case 0:
					entry = entries[i].getElementsByTagName('The-Four-Gospels');
					break;
				case 1:
					entry = entries[i].getElementsByTagName('Other-New-Testament');
					break;
				case 2:
					entry = entries[i].getElementsByTagName('The-Books-of-Poetry');
					break;
				case 3:
					entry = entries[i].getElementsByTagName('Other-Old-Testament');
					break;
			}
			var book = entry.getElementsByTagName('book').firstChild.data;
			var chapter = entry.getElementsByTagName('chapter').firstChild.data;
			var verse = entry.getElementsByTagName('verse').firstChild.data;
			row += '<td>' + book + ' ' + chapter + ':' + verse + '</td>';
		}
		row += '</tr>';

		document.getElementById("table").innerHTML = row;
	}

	/*
	var gname = xmlDoc.getElementsByTagName("day")[0].firstChild.data;
	document.getElementById("gname").innerHTML = gname;

	var members = "";
	var member = xmlDoc.getElementsByTagName("member");
	for (i = 0; i < member.length; i++) { 
		if (i != 0) { members += ", "; }
		members += member[i].firstChild.data;
	}
	document.getElementById("members").innerHTML = members;

	var albums = "";
	var album = xmlDoc.getElementsByTagName("album");
	for (i = 0; i < album.length; i++) { 
		albums += "<li>" + album[i].getAttribute('order') + ": " +
			album[i].firstChild.data + "</li>\n";
	}
	document.getElementById("albums").innerHTML = albums;
	*/
}
