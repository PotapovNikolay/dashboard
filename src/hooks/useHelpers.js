export default function () {

    function number2Word(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    }

    function numberFormat(val) {
        let parts = (val + "").split("."),
            main = parts[0],
            len = main.length,
            output = "",
            i = len - 1;
        while (i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = "\u00A0" + output;
            }
            --i;
        }
        if (parts.length > 1) {
            output += "." + parts[1];
        }
        return output;
    }

    function translit(str) {
        // if (/^[а-яs]+$/i.test(str) || /\s/g.test(str)) {
        let magic = function (lit) {
            let literals = [
                ["а", "a"],
                ["б", "b"],
                ["в", "v"],
                ["г", "g"],
                ["д", "d"],
                ["е", "e"],
                ["ё", "yo"],
                ["ж", "zh"],
                ["з", "z"],
                ["и", "i"],
                ["й", "j"],
                ["к", "k"],
                ["л", "l"],
                ["м", "m"],
                ["н", "n"],
                ["о", "o"],
                ["п", "p"],
                ["р", "r"],
                ["с", "s"],
                ["т", "t"],
                ["у", "u"],
                ["ф", "f"],
                ["х", "h"],
                ["ц", "c"],
                ["ч", "ch"],
                ["ш", "w"],
                ["щ", "shh"],
                ["ъ", "''"],
                ["ы", "y"],
                ["ь", "'"],
                ["э", "e"],
                ["ю", "yu"],
                ["я", "ya"],
                ["А", "A"],
                ["Б", "B"],
                ["В", "V"],
                ["Г", "G"],
                ["Д", "D"],
                ["Е", "E"],
                ["Ё", "YO"],
                ["Ж", "ZH"],
                ["З", "Z"],
                ["И", "I"],
                ["Й", "J"],
                ["К", "K"],
                ["Л", "L"],
                ["М", "M"],
                ["Н", "N"],
                ["О", "O"],
                ["П", "P"],
                ["Р", "R"],
                ["С", "S"],
                ["Т", "T"],
                ["У", "U"],
                ["Ф", "F"],
                ["Х", "H"],
                ["Ц", "C"],
                ["Ч", "CH"],
                ["Ш", "W"],
                ["Щ", "SHH"],
                ["Ъ", ""],
                ["Ы", "Y"],
                ["Ь", ""],
                ["Э", "E"],
                ["Ю", "YU"],
                ["Я", "YA"],
                ["-", "-"],
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["a", "a"],
                ["b", "b"],
                ["c", "c"],
                ["d", "d"],
                ["e", "e"],
                ["f", "f"],
                ["g", "g"],
                ["h", "h"],
                ["i", "i"],
                ["j", "j"],
                ["k", "k"],
                ["l", "l"],
                ["m", "m"],
                ["n", "n"],
                ["o", "o"],
                ["p", "p"],
                ["q", "q"],
                ["r", "r"],
                ["s", "s"],
                ["t", "t"],
                ["u", "u"],
                ["v", "v"],
                ["w", "w"],
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["A", "A"],
                ["B", "B"],
                ["C", "C"],
                ["D", "D"],
                ["E", "E"],
                ["F", "F"],
                ["G", "G"],
                ["H", "H"],
                ["I", "I"],
                ["J", "J"],
                ["K", "K"],
                ["L", "L"],
                ["M", "M"],
                ["N", "N"],
                ["O", "O"],
                ["P", "P"],
                ["Q", "Q"],
                ["R", "R"],
                ["S", "S"],
                ["T", "T"],
                ["U", "U"],
                ["V", "V"],
                ["W", "W"],
                ["X", "X"],
                ["Y", "Y"],
                ["Z", "Z"],
            ];

            let word = literals
                .map((i) => {
                    if (i[0] === lit) {
                        return i[1];
                    } else {
                        return undefined;
                    }
                })
                .filter((i) => i !== undefined);
            if (word.length > 0) {
                return word[0];
            } else {
                return "-";
            }
        };
        return Array.from(str)
            .map((i) => magic(i))
            .join("");
    }

    return { number2Word, numberFormat, translit };
}
