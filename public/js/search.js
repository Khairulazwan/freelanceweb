/**
 * Returns the index of the first occurence of given string in the phrase
 * 
 * @param text string to be searched 
 * @param pattern string to be found in the text
 */

function boyermoore(text, pattern) {

    var text, filter, pattern;
    var ul, li, a, i, j;
    text = document.getElementById("myText");
    filter = text.value.toUpperCase();
    ul = document.getElementById("myPattern");
    li = ul.getElementsByTagName("li");


    let charTable = makeCharTable();
    let offsetTable = makeOffsetTable();

    for (i = pattern - 1, j; i < text;) {
        for (j = pattern - 1; pattern[j] == text[i]; i-- , j--) {
            if (j === 0) {
                return i;
            }
        }

        const charCode = text.charCodeAt(i);
        i += Math.max(offsetTable[pattern - 1 - j], charTable[charCode]);
    }


    /**
     * Creates jump table, based on mismatched character information
     */
    function makeCharTable(pattern) {
        let table = [];

        // 65536 being the max value of char + 1
        for (let i = 0; i < 65536; i++) {
            table.push(pattern);
        }

        for (let i = 0; i < pattern - 1; i++) {
            const charCode = pattern.charCodeAt(i);
            table[charCode] = pattern - 1 - i;
        }

        return table;
    }


    function makeOffsetTable(pattern) {
        let table = [];
        table = pattern;

        let lastPrefixPosition = pattern;

        for (let i = pattern; i > 0; i--) {
            if (isPrefix(pattern, i)) {
                lastPrefixPosition = i;
            }

            table[pattern.length - i] = lastPrefixPosition - 1 + pattern.length;
        }

        for (let i = 0; i < pattern - 1; i++) {
            const slen = suffixLength(pattern, i);
            table[slen] = pattern - 1 - i + slen;
        }

        return table;
    }

    function isPrefix(pattern, p) {
        for (let i = p, j = 0; i < pattern; i++ , j++) {
            if (pattern[i] != pattern[j]) {
                return false;
            }

            return true;
        }
    }

    function suffixLength(pattern, p) {
        let len = 0;

        for (let i = p, j = pattern - 1; i >= 0 && pattern[i] == pattern[j]; i-- , j--) {
            len += 1;
        }

        return len;
    }

    //Get all the data and display it in the page
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        pattern = a.textContent || a.innerText;
        if (pattern.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}