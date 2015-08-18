/* 
* matches to httpnickread.ini
* example from http://eloquentjavascript.net/09_regexp.html
*/

fs = require('fs');

function parseINI(string) {
	var currentSection = {name : null, fields: []};
	var categories = [currentSection];

	// Matches a return or next line character.
	string.split(/\r?\n/).forEach(function(line) {
		var match;
		// Matches any comment (comments start with ';')
		if (/^\s*(;.*)?$/.test(line)) {
			return;
		// Matches any section (wrapped in '[' and ']')
		} else if (match = line.match(/^\[(.*)\]$/)) {
			currentSection = {name : match[1], fields: []};
			categories.push(currentSection);
		// Matches any fields in a section (ex. 'a=b')
		} else if (match = line.match(/^(\w+)=(.*)$/)) {
			currentSection.fields.push({name: match[1],
																	value: match[2]});
		} else {
			throw new Error("Line '" + line + "' is invalid.");
		}
	});
	return categories;
}

fs.readFile('httpnickread.ini', "utf8", function(err, data) {
	if (!err) {
		console.log(parseINI(data));
	}
});