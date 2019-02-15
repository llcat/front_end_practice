// value key 1xx
const KEY_VAL_0 = 100;
const KEY_VAL_1 = 101;
const KEY_VAL_2 = 102;
const KEY_VAL_3 = 103;
const KEY_VAL_4 = 104;
const KEY_VAL_5 = 105;
const KEY_VAL_6 = 106;
const KEY_VAL_7 = 107;
const KEY_VAL_8 = 108;
const KEY_VAL_9 = 109;
const KEY_VAL_DOT = 110;
const KEY_VAL_PI = 111;
const KEY_VAL_EULER = 112;

// operate key 2xx
const KEY_OP_PLUS = 200;
const KEY_OP_MINUS = 201;
const KEY_OP_MULTIPLY = 202;
const KEY_OP_DIVIDE = 203;
const KEY_OP_EQUAL = 204;
const KEY_OP_PERCENT = 205;
const KEY_OP_2ND = 206;
const KEY_OP_DEG = 207;
const KEY_OP_SIN = 208;
const KEY_OP_COS = 209;
const KEY_OP_TAN = 210;
const KEY_OP_POWER = 211;
const KEY_OP_LG = 212;
const KEY_OP_LN = 213;
const KEY_OP_LEFT_PARENTHESES = 214;
const KEY_OP_RIGHT_PARENTHESES = 215;
const KEY_OP_SQRT = 216;
const KEY_OP_FACTORIAL = 217;
const KEY_OP_DEVIDE_BY_ONE = 218;


// function key 3xx
const KEY_FUNC_AC = 300;
const KEY_FUNC_DELETE = 301;
const KEY_FUNC_TRANSFORM = 302;

// layout 4*5
const basicKeyLayout = [
    [KEY_FUNC_AC, KEY_FUNC_DELETE, KEY_OP_PERCENT, KEY_OP_DIVIDE],
    [KEY_VAL_7, KEY_VAL_8, KEY_VAL_9, KEY_OP_MULTIPLY],
    [KEY_VAL_4, KEY_VAL_5, KEY_VAL_6, KEY_OP_MINUS],
    [KEY_VAL_1, KEY_VAL_2, KEY_VAL_3, KEY_OP_PLUS],
    [KEY_FUNC_TRANSFORM, KEY_VAL_0, KEY_VAL_DOT, KEY_OP_EQUAL]
]

// layout 5*7
const advancedKeyLayout = [
    [KEY_OP_2ND, KEY_OP_DEG, KEY_OP_SIN, KEY_OP_COS, KEY_OP_TAN],
    [KEY_OP_POWER, KEY_OP_LG, KEY_OP_LN, KEY_OP_LEFT_PARENTHESES, KEY_OP_RIGHT_PARENTHESES],
    [KEY_OP_SQRT, KEY_FUNC_AC, KEY_FUNC_DELETE, KEY_OP_PERCENT, KEY_OP_DIVIDE],
    [KEY_OP_FACTORIAL, KEY_VAL_7, KEY_VAL_8, KEY_VAL_9, KEY_OP_MULTIPLY],
    [KEY_OP_DEVIDE_BY_ONE, KEY_VAL_4, KEY_VAL_5, KEY_VAL_6, KEY_OP_MINUS],
    [KEY_VAL_PI, KEY_VAL_1, KEY_VAL_2, KEY_VAL_3, KEY_OP_PLUS],
    [KEY_FUNC_TRANSFORM, KEY_VAL_EULER, KEY_VAL_0, KEY_VAL_DOT, KEY_OP_EQUAL]
]

let keyProps = {
    [KEY_VAL_0]: {
        id: KEY_VAL_0,
        type: "val",
        text: "0",
    },
    [KEY_VAL_1]: {
        id: KEY_VAL_1,
        type: "val",
        text: "1",
    },
    [KEY_VAL_2]: {
        id: KEY_VAL_2,
        type: "val",
        text: "2"
    },
    [KEY_VAL_3]: {
        id: KEY_VAL_3,
        type: "val",
        text: "3",
    },
    [KEY_VAL_4]: {
        id: KEY_VAL_4,
        type: "val",
        text: "4",
    },
    [KEY_VAL_5]: {
        id: KEY_VAL_5,
        type: "val",
        text: "5"
    },
    [KEY_VAL_6]: {
        id: KEY_VAL_6,
        type: "val",
        text: "6",
    },
    [KEY_VAL_7]: {
        id: KEY_VAL_7,
        type: "val",
        text: "7"
    },
    [KEY_VAL_8]: {
        id: KEY_VAL_8,
        type: "val",
        text: "8",
    },
    [KEY_VAL_9]: {
        id: KEY_VAL_9,
        type: "val",
        text: "9",
    },
    [KEY_VAL_DOT]: {
        id: KEY_VAL_DOT,
        type: "val",
        text: "."
    },
    [KEY_VAL_EULER]: {
        id: KEY_VAL_EULER,
        type: "val",
        text: "e"
    },
    [KEY_OP_PLUS]: {
        id: KEY_OP_PLUS,
        type: "op",
        text: "+"
    },
    [KEY_OP_MINUS]: {
        id: KEY_OP_MINUS,
        type: "op",
        text: "-"
    },
    [KEY_OP_MULTIPLY]: {
        id: KEY_OP_MULTIPLY,
        type: "op",
        text: "×"
    },
    [KEY_OP_DIVIDE]: {
        id: KEY_OP_DIVIDE,
        type: "op",
        text: "÷"
    },
    [KEY_OP_EQUAL]: {
        id: KEY_OP_EQUAL,
        type: "op",
        text: "="
    },
    [KEY_OP_PERCENT]: {
        id: KEY_OP_PERCENT,
        type: "op",
        text: "%"
    },
    [KEY_OP_2ND]: {
        id: KEY_OP_2ND,
        type: "op",
        text: "2nd"
    },
    [KEY_OP_DEG]: {
        id: KEY_OP_DEG,
        type: "op",
        text: "deg"
    },
    [KEY_OP_SIN]: {
        id: KEY_OP_SIN,
        type: "op",
        text: "sin"
    },
    [KEY_OP_COS]: {
        id: KEY_OP_COS,
        type: "op",
        text: "cos"
    },
    [KEY_OP_TAN]: {
        id: KEY_OP_TAN,
        type: "op",
        text: "tan"
    },
    [KEY_OP_POWER]: {
        id: KEY_OP_POWER,
        type: "op",
        text: "X^y"
    },
    [KEY_OP_LG]: {
        id: KEY_OP_LG,
        type: "op",
        text: "lg"
    },
    [KEY_OP_LN]: {
        id: KEY_OP_LN,
        type: "op",
        text: "ln"
    },
    [KEY_OP_LEFT_PARENTHESES]: {
        id: KEY_OP_LEFT_PARENTHESES,
        type: "op",
        text: "("
    },
    [KEY_OP_RIGHT_PARENTHESES]: {
        id: KEY_OP_RIGHT_PARENTHESES,
        type: "op",
        text: ")"
    },
    [KEY_OP_LG]: {
        id: KEY_OP_LG,
        type: "op",
        text: "lg"
    },
    [KEY_OP_LN]: {
        id: KEY_OP_LN,
        type: "op",
        text: "ln"
    },
    [KEY_OP_LEFT_PARENTHESES]: {
        id: KEY_OP_LEFT_PARENTHESES,
        type: "op",
        text: "("
    },
}