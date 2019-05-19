export function parseCSV(val) {
	//Corrección test opcional 2 | hotfix/2
    return val.split(',').map(str => str.trim());
}

