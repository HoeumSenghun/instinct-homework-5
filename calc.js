var functionMap = {
    "addButton": (a, b) => a + b,
    "subtractButton": (a, b) => a - b,
    "multiplyButton": (a, b) => a * b,
    "divideButton": (a, b) => a / b
};

var stack = [];
var display = '';
var current;

function evaluate(stack) {
    return functionMap[stack[1]](stack[0], stack[2]);
}

$(function() {
    $(".digit").click(function() {
        if (stack.length === 3) {
            display = '';
            stack = [];
        }

        display += $(this).val();
        $("#display").val(display);
        current = Number(display);
    });

    $("#clearButton").click(function() {
        stack = [];
        display = '';
        current = NaN;
        $("#display").val(display);
    });

    $(".operator").click(function() {
        if (stack.length === 1 || stack.length === 3) {
            stack.push(this.id);
        } else if (stack.length === 2) {
            if (isNaN(current)) {
                stack[1] = this.id;
            } else {
                stack.push(current);
                display = evaluate(stack);
                $("#display").val(display);
                stack = [Number(display), this.id];
            }
        } else {
            stack.push(current);
            stack.push(this.id);
            display = '';
        }
        current = NaN;
        display = '';
    });

    $("#equalsButton").click(function() {
        if (stack.length === 2) {
            stack.push(current);
            display = evaluate(stack);
            $("#display").val(display);
            stack = [Number(display)];
        }
    });
});
