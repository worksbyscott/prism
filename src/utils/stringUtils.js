function stringToHyphens(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function stringContains(str, text) {
    return str.indexOf(text) > -1;
}

export {
    stringToHyphens,
    stringContains
}