/**
 * 函数柯里化
 */
var currying = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(null, newArgs);
    }
}

function curry (func, minArgs) {
    if (minArgs == undefined) {
        minArgs = 1;
    }
    function A (frozenArgs) {
        return function () {
            // 将参数格式化为数组形式
            var args = Array.prototype.slice.call(arguments);
            var newArgs = frozenArgs.concat(args);
            if (newArgs.length > minArgs) {
                return func.apply(this, newArgs);
            } else {
                return A(newArgs);
            }
        }
    }
    return A([]);
}

function a (x, y, z) {
    return x + y + z;
}

function b (fn) {
    var args = [].slice.call(arguments, 1);
    return args;
}

var plus = curry(function () {
    var result = 0;
    for (let i = 0; i < arguments.length; ++i) {
        result += arguments[i];
    }
    return result;
})

let sayHi = async function sayHi() {
    let hi = await 'hello world';
    throw new Error('err');
    return hi;
}
sayHi().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
