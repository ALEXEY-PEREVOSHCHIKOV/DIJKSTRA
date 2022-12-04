function Dijkstra(expression) {
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    }
    var stack = new Array();
    var result = '';
    var number = '';


    function Foundation() {
        var Counter = 0;
        for (var j = i + 1; j < expression.length; j++) {
            if (expression[j] == ')' && Counter == 0) {
                return j;
            }
            if (expression[j] == '(')
            Counter++;
            if (expression[j] == ')')
            Counter--;
        }
    }

    for (var i = 0; i < expression.length; i++) {
        if (isNaN(expression[i]) && priority[expression[i]] == undefined && expression[i] != '(' && expression[i] != ')') {
            return "Unexpect expression - " + expression[i];
        }
        if (!isNaN(expression[i])) {
            number += expression[i];
            continue;
        } else {
            if (number.length != 0) {
                result += number;
                number = '';
            }
            if (expression[i] == '(') {
                var closingBracket = Foundation();
                result += Dijkstra(expression.substring(i + 1, closingBracket));
                i = closingBracket;
                continue;
            }
            if (stack.length == 0) {
                stack.push(expression[i]);
                continue;
            }
            if (expression[i] == '^') {
                stack.push(expression[i]);
                continue;
            }
            if (priority[expression[i]] <= priority[stack[stack.length - 1]]) {
                while (priority[expression[i]] <= priority[stack[stack.length - 1]]) {
                    result += stack[stack.length - 1];
                    stack.pop();
                }
                stack.push(expression[i]);
                continue;
            }else{
                stack.push(expression[i]);
            }
        }
    }
    if(number.length!=0) result+=number;
    for (var i = stack.length - 1; i >= 0; i--) {
        result += stack[i];
    }
    return result;
}

var file = process.argv[2];
var fs = require('fs');
var input = fs.readFileSync(file).toString();
console.log("Expression: "+input);
console.log(Dijkstra(input));