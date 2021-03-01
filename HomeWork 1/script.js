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

console.log(fib(8));
console.log(fib(610));

//2

function flatArray(arr) {
    return arr.reduce((newArr, value) => newArr.concat(Array.isArray(value) ? flatArray(value) : value), []).sort((a, b) => {
        return a - b;
    });
}

function difference(arr1, arr2) {
    return flatArray(arr1).concat(flatArray(arr2)).filter((x, index, array)=> {
        return array.indexOf(x) === index;
    }).sort((a, b) => {
        return a - b;
    })
}

console.log(difference([1, 2, 3], [100, 2, 1, 10]));
console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
console.log(difference([1, 2, 3], [100, 2, 1, 10]));

console.log(difference([1, 11, 9, 4, 4, 4, [9], [6], 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));

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
console.log(copyObject({name: 'Sasha', age: 99}));
console.log(copyObject({title: 'New book', type: 'Horror'}));

//5
function convertObjectToArray(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push([key, obj[key]])
    }
    return arr;
}

console.log(convertObjectToArray({a: 'aa',b: 2, c: 3}));
console.log(convertObjectToArray({name: 'Sasha', age: 99}));
console.log(convertObjectToArray({title: 'New book', type: 'Horror'}));

//6
function uncamelize(str, sep = ' ') {
    return str.split('').map((x, index) => {
        if (x.charCodeAt(0) >= 65 && x.charCodeAt(0) <= 90) {
            if (index === 0)
                return x.toLowerCase();
            return `${sep}${x.toLowerCase()}`;
        } else {
            return x;
        }
    }).join('');
}

console.log(uncamelize('helloWorld'));
console.log(uncamelize('helloWorld','-'));
console.log(uncamelize('HelloWorld','_'));

//7
function countSubstrInStr(str, subtr) {
    return str.split(subtr).length - 1;
}

console.log(countSubstrInStr('phone iphone telephone phoneee', 'phone'));
console.log(countSubstrInStr('carcarcar', 'ca'));
console.log(countSubstrInStr('qweqweqwqwwqe', 'qwe'));


//8 
function flatArray(arr) {
    return arr.reduce((newArr, value) => newArr.concat(Array.isArray(value) ? flatArray(value) : value), []).sort((a, b) => {
        return a - b;
    });
}

console.log(flatArray([1, 2, 3, [4], 5, [[6]], [[[[6]]]], [1, 2, 3, [[7]]]]));
console.log(flatArray([1, 2, 1000, 300, [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]]));

//9
function deleteNullOrUndefinedFromArray(arr, callback) {
    setTimeout(() => {
        callback(
            null,
            arr.filter(x => {
                return x != null || x != undefined;
            })
        );
    }, 5000);
}

deleteNullOrUndefinedFromArray([1, 2, 3, null ,undefined, null, 1, 1, 1, undefined], (err, arr) => {
    if (err){
        console.log(err);
    }
    else {
        console.log(arr);
    }
});

//10
function returnPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success!");
        }, 6000);
    })
}

returnPromise().then(result => {
    console.log(`Result: ${result}`);
}, error => {
    console.log(`Error: ${error}`);
});

//11
async function runPromisesInSeries(tasks) {
    for (let el of tasks) {
        console.log(await el);
    }
}

runPromisesInSeries([
    new Promise((resolve, reject) => {setTimeout(() => {resolve("Success 1")}, 2000)}),
    new Promise((resolve, reject) => {setTimeout(() => {resolve("Success 2")}, 5100)}),
    new Promise((resolve, reject) => {setTimeout(() => {resolve("Success 3")}, 1800)}),
    new Promise((resolve, reject) => {setTimeout(() => {resolve("Success 4")}, 1100)})
]);

//12
function parallelRequests() {
    document.getElementById('task1').innerHTML = '';
    Promise.all([
        fetch('http://geocode.xyz/Minsk?json=1&auth=869122208963241887711x53952').then(res => res.json()),
        fetch('http://geocode.xyz/Madrid?json=1&auth=869122208963241887711x53952').then(res => res.json()),
        fetch('http://geocode.xyz/Rome?json=1&auth=869122208963241887711x53952').then(res => res.json()),
    ]).then(responces => {
        responces.forEach(x => {
            document.getElementById('task1').innerHTML += `${x.standard.city} - ${x.standard.countryname} <br>`;
        });
    }, error => {
        new Error(error);
    });
}

function promiseRace() {
    document.getElementById('task2').innerHTML = '';
    Promise.race([
        fetch('http://geocode.xyz/Paris?json=1&auth=869122208963241887711x53952').then(res => res.json()),
        fetch('http://geocode.xyz/Nice?json=1&auth=869122208963241887711x53952').then(res => res.json()),
    ]).then(res => {
        document.getElementById('task2').innerHTML = `City: ${res.standard.city}, Country: ${res.standard.countryname}`
    }, error => {
        new Error(error);
    })
}

function getCities(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Kyiv Moscow Warszawa Vilnius Riga");
        }, 3000);
    })
}

function promiseResolves() {
    document.getElementById('task3').innerHTML = '';
    getCities().then(result => {
        let links = result.split(' ').map(x => {
            return `http://geocode.xyz/${x}?json=1&auth=869122208963241887711x53952`;
        })

        Promise.all(links.map(x => fetch(x))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(responces => {
            responces.forEach(x => {
                document.getElementById('task3').innerHTML += `City: ${x.standard.city}, County: ${x.standard.countryname} <br>`
            }), 
            error => {
                new Error(error);
            }
        });
    });
}