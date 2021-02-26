//1
function fib(n) {
    if (n !== 1 && n !== 0) {
        let arr = [0, 1];
        while ((arr[arr.length-1] + arr[arr.length-2]) + arr[arr.length-1] <= n) {
            arr.push(arr[arr.length-1] + arr[arr.length-2]);
        }
        return arr;
    } else {
        return n === 1 ? [0, 1] : [0];
    }
}

console.log(fib(610));

//2

function flatArray(arr) {
    return arr.reduce((newArr, value) => newArr.concat(Array.isArray(value) ? flatArray(value) : value), []);
}
function difference(arr1, arr2) {
    return flatArray(arr1).concat(flatArray(arr2)).filter(x => {
        return !arr1.includes(x) || !arr2.includes(x)
    })
}

console.log(difference([1, 2, 3], [3, 4, 5]))

//3
function caseInsensitiveSearch(str, word) {
    return str.toLowerCase().includes(word.toLowerCase()) ? 'Matched' : 'Not Matched';
}

console.log(caseInsensitiveSearch('JavaScript Exercises', 'exercises'));
console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercises'));
console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercisess'));

//4
function copyObject(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[obj[key]] = key;
    }
    return newObj;
}

console.log(copyObject({a: 1, b: 2}));

//5
function convertObjectToArray(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push([key, obj[key]])
    }
    return arr;
}

console.log(convertObjectToArray({a: 'aa',b: 2, c: 3}));

//6
function uncamelize(str, sep = ' ') {
    return str.replace(/[A-Z]/g, (l, index) => {
        return index !== 0 ? sep + l.toLowerCase() : l.toLowerCase();
    });
}

console.log(uncamelize("HelloWord", '-'))

//7
function countSubstrInStr(str, subtr) {
    return str.split(subtr).length - 1;
}

console.log(countSubstrInStr('carcarcar', 'ca'));


//8 
function flatArray(arr) {
    return arr.reduce((newArr, value) => newArr.concat(Array.isArray(value) ? flatArray(value) : value), []);
}

console.log(flatArray([1, 2, 3, [4], 5, [[6]], [[[[6]]]], [1, 2, 3, [[7]]]]));
console.log(flatArray([1, 2, 1000, 300, [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]]));

//9
function deleteNullOrUndefinedFromArray(arr, callback) {
    setTimeout(() => {
        callback(
            arr.filter(x => {
                return x != null || x != undefined;
            })
        )
    }, 5000);
}

deleteNullOrUndefinedFromArray([1, 2, 3, null ,undefined, null, 1, 1, 1, undefined], arr => {
    console.log(arr)
})

//10
function returnPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success!");
        }, 6000);
    })
}

returnPromise().then((result) => {
    console.log(`Result: ${result}`);
}, error => {
    console.log(`Error: ${error}`)
});

//11
function arrayPrimises(arr) {
    for (let i in arr) {

    }
}

//12

async function parallelRequests() {
    await Promise.all([
        fetch('http://geocode.xyz/Minsk?json=1&auth=869122208963241887711x53952').then(res =>
            console.log(res.json())
        ),
        fetch('http://geocode.xyz/Madrid?json=1&auth=869122208963241887711x53952').then(res => 
            console.log(res.json())
        ),
        fetch('http://geocode.xyz/Rome?json=1&auth=869122208963241887711x53952').then(res => 
            console.log(res.json())
        )
    ])
} 