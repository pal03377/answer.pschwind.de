const aCode = "a".charCodeAt(0);
const zCode = "z".charCodeAt(0);
const ACode = "A".charCodeAt(0);
const ZCode = "Z".charCodeAt(0);

function mod(n, m) {
    // n mod m
    return ((n % m) + m) % m;
}

function jumbleChar(c, add) {
    let code = c.charCodeAt(0);
    if (code >= aCode && code <= zCode) {
        code = mod((code - aCode + add), (zCode - aCode + 1)) + aCode;
    } else if (code >= ACode && code <= ZCode) {
        code = mod((code - ACode + add), (ZCode - ACode + 1)) + ACode;
    } else {
        code += add;
        if (code >= aCode && code <= zCode) {
            // jump out of range a-z
            if (add > 0) code += (zCode - aCode + 1);
            else code -= (zCode - aCode + 1);
        }
        if (code >= ACode && code <= ZCode) {
            // jump out of range A-Z
            if (add > 0) code += (ZCode - ACode + 1);
            else code -= (ZCode - ACode + 1);
        }
        if (code < 0) code = 65536 + code;
        if (code >= 65536) code -= 65536;
    }
    return String.fromCharCode(code);
}

export function jumbleName(name) {
    let jumbled = "";
    for (let i = 0; i < name.length; i ++) {
        jumbled += jumbleChar(name[i], 1 + (i % 3));
    }
    try {
        return encodeURIComponent(jumbled);
    } catch (URLError) {
        return "?";
    }
}
export function unjumbleName(name) {
    name = decodeURIComponent(name);
    let unjumbled = "";
    for (let i = 0; i < name.length; i ++) {
        // jumble negative
        unjumbled += jumbleChar(name[i], - 1 - (i % 3));
    }
    return unjumbled;
}


// some testing code
for (let c = 0; c <= 65536; c++) {
    let char = String.fromCharCode(c);
    for (let add = -2; add <= 2; add ++) {
        let j = jumbleChar(char, add);
        let u = jumbleChar(j, -add);
        if (u !== char) {
            throw new Error("Char " + c + " (" + char + ") add " + add + " jumbles to " + j.charCodeAt(0) + "(" + j + "), but unjumbles to " + u.charCodeAt(0) + " (" + u + ").");
        }
    }
    let j = jumbleName(char);
    let u = unjumbleName(j);
    if (u !== char && j !== "?") {
        throw new Error("Name jumble: Char " + c + " (" + char + ") jumbles to " + j.charCodeAt(0) + "(" + j + "), but unjumbles to " + u.charCodeAt(0) + " (" + u + ").");
    }
}