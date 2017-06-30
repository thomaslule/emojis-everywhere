module.exports = function(unicode) {
    return unicode.split("-")
    .map(codeToStringSimple)
    .join("");
}

let codeToStringSimple = function(code) {
    return String.fromCodePoint( +( "0x" + code ) );
}
