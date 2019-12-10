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
		for (j = 0; j < 4; j++) {
			var entry
		}
		var fourGospel = entries[i].getElementsByTagName('The-Four-Gospels');
		var otherNew = entries[i].getElementsByTagName('Other-New-Testament');
		var poetry = entries[i].getElementsByTagName('The-Books-of-Poetry');
		var otherOld = entries[i].getElementsByTagName('Other-Old-Testament');

		document.getElementById('Day').innerHTML = day;
		document.getElementById('FG').innerHTML = fourGospel.;
		document.getElementById('ON').innerHTML = day;
		document.getElementById('PO').innerHTML = day;
		document.getElementById('OO').innerHTML = day;

	}

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
}
