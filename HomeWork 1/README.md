### Russian
## Домашняя работа 1
# Задание 1
В первом задании нужно было написать функцию, которая возвращает ряд Фибоначчи до определённого числа. У нас в функцию передаётся один параметр, это и есть число, до которого нам нужно сгенерировать ряд. Сразу есть проверка, является ли это число 0 или 1, т.к. если нам нужен рядо до 0 или 1, то нам нужно просто сразу вернуть массив, без подсчёта последующих элементов. Если же это число отличное от 0 или 1, то мы уже можем посчитать дальнейшие нашей последовательности. У нас создаётся массив из двух первоначальных элементов, куда мы и будем добавлять остальные элементы. У нас есть цикл, который проверяет, меньше ли сумма двух последних элементов массива и последнего элемента нужного нам значения ((arr[len-1] + arr[len-2]) + arr[len-1] <= n). Если же условие выполняется, то мы заносим новое значение в массив, если нет, то цилк заканчивается и возвращается сгенерированный массив.

# Задание 2
Во втором задании, нам нужно было написать функцию, которая бы объединяла массивы, удаляла бы из них одинаковые элементы и потом сортировала по возрастанию. Функция по выравниванию массива будет описана в 8 задании. Нам нужно было написать функцию, которая бы принимала два массива, объединяла их и удаляла повторяющиеся элемента. Для этого мы используем метод .concat для объединения массивов и функцию flatArray для выравнивания массива. Потом, мы с помощтю фунции .filter возвращаем новый массив, где будут только уникальные значения и в конце в помощью метода .sort сортируем числа, т.к. метод .sort изначально сортирует строки, нам нужно передать callback для сортировки чисел.

# Задание 3
В третьем задании нам нужно было выполнить поиск подстроки в строке. В функцию мы передаём два значения - это наша строка и подстрока, которую мы ищем. Мы применяем метод .toLowerCase у строки и подстроки чтобы убрать зависимость от регистра. Потом мы вызываем метод .include у нашей строки, который и показывает, если ли подстрока в нашей строке.

# Задание 4
В четрвёртом задании нужно было написать функцию, которая бы делала копию объекта, где ключи это значения и значения это ключи. В нашу функцию мы принимаем один параметр, это и есть объект, который мы будем копировать. Потом мы создаём новый объект и с помощью цикла for...in мы проходим через все свойства объекта. В цикле, мы создаём новому объекту свойство на основе значения переданного объекта и присваиваем значение на основе ключа переданного объекта.

# Задание 5
В пятом задании нужно было привести объекта к двумерному массиву типа [[key, value]]. Для этого мы передаём объекта, соаздём пустой массив и уже с помощью знакомого нам цикла for...in проходим по его свойствам. В массив мы добавляем новый массив, чтобы получился двумерный массив типа [[ket, value]] и возвращаем получившийся массив.

# Задание 6
В шестом задании, нам нужно было написать функцию, которая бы делала uncamelize (я не знаю, как это напистаь на русском). Для этого, мы принимаем строку и разделитель, которым будем разделять слова, с помощью .split делаем из строки массив символов и с помощью .map начинаем работать с каждым элементом строки. Т.к. все значения заглавных букв юникода находятся в диапазоне от 65 до 90, то мы проверяем, входит ли наш символ в этот диапазон. Если входит, то приводим символ к нижнему регистрку и добавляем перед ним разделитель. Так же, есть дополнительная проверка, если первый символ строки заглавный, то его тоже приводим к нижнему регистру. Если же символ не входит в нужный диапазон, то прокто его возвращаем. Потом в нашему модифицированному массиву символом применяем метод .join для создания строки и возвращаем её.

# Задание 7
В седьмом задании нам нужно было посчитать количество вхождений подстроки в строку. Для этого мы принимаем строку и подстроку, количество вхождений которой мы ищем. У строки мы вызываем метод .split, а в параметр указываем нашу подстроку, превращая тем самым нашу строку в массив, разделением для которого служит наша подстрока. Потом мы от размерности этого массива отнимаем единицу и возвращаем это значение. Мы отнимаем единицу потому что, когда мы выполняем метод .split у нас всегда будет оставаться лишний элемент, и именно его мы и отнимаем.

# Задание 8
В восьмом задании нам нужно было написать функцию для выравнивания массива. Для этого мы передаём невыравненный массив. У этого массива мы вызываем метод .reduce для того, чтобы перебрать все элементы нашего массива и сформировать на выходе новый массив. В самом методе .reduce мы вызываем для каждого элемента метод .concat, чтобы объединить массивы, а при объединении мы проверяем, если у нас элемент является массивом, то мы опять вызываем эту же функцию (т.е. делаем ресурсию), если же элемент не является массивом, то мы его присоединем в новому массиву. После к полученному массиву применяем метод .sort с параметрами для сортировки чисел и возвращаем полученный массив.

# Задание 9
В девятом задании нам нужно было написать функцию, которая будет удалять из массива null и undefined значения. Функция принимает массив и callback, который будет вызван после 5 секунд. Для вызова callback через 5 секунд мы используем функцию setTimeout, в которую передаём callback, в котором уже вызываем наш callback, который мы передавали в параметры функции. В наш callback, мы передаём два параметра, первый - это ошибки, т.к. у нас их нету мы передаём null, а второй параметр, это выполнение метода .filter у массива, который мы передали, чтобы вернуть новый массив без null и undefined элементов. 

# Задание 10
В десятом задании, нам нужно было написать функцию, которая возвращает промис, который должен выполнится через 6 секунд. Для этого, мы оборачиваем вызов функции resolve функцией setTimeout. Когда мы вызываем нашу созданную функцию, у функции вызываем метод .then, куда передаём callback, который будет выполнен после выполнения промиса. 

# Задание 11
В одиннадцатом задании, нам нужно было написать функцию, которая будет принимать массив промисов и выполнять их друг за другом. Для этого, я создал асинхронную функцию, чтобы использовать конструкцию async await. В самой функции я с помощью цикла for...of перебираю все элементы массива и перед вызовом каждого элемента промиса пишу await.

# Задание 12
В первой части двенадцатого задания нам нужно было сделать три параллельных запроса и обработать их ответы. Для этого, была написала функция, где вызывается метод Promise.all, который и позволяет делать параллельный запросы, для запросов нужно использовать функцию fetch, в которую мы и передаём адрес, по которому будем делать запрос. После, с помощью метода then мы обрабатываем полученный ответы. В моём случае, я получаю элемент по страницы с помощью метода document.getElementById и меняю innerHTML.

Во второй части двенадцатого задания нужно было написать функцию, которая будет вызывать метод Promise.race для двух запросов. Для этого, мы вызываем метод Promise.race и в него передаём массив из двух элементов и в ответ мы уже получаем один объект, свойства которого мы выводим с помощью document.getElementById.

Во третьей части двенадцатого задания нужно было написать функцию, которая будет возвращать список городов через 3 секунды. Потом ещё одну функцию, которая будет отправлять параллельный запросы на основе полученных городов и после будет отображение на html странице полученных данных.

### English
## HomeWork 1
# Task 1
In the first task, it was necessary to write a function that returns the Fibonacci series up to a certain number. We pass one parameter to the function, this is the number up to which we need to generate a series. Immediately there is a check whether this number is 0 or 1, since if we need a row up to 0 or 1, then we just need to return the array immediately, without counting subsequent elements. If this number is different from 0 or 1, then we can already count the further ones in our sequence. We create an array of two initial elements, where we will add the rest of the elements. We have a loop that checks if the sum of the last two elements of the array and the last element of the value we want is less than ((arr [len-1] + arr [len-2]) + arr [len-1] <= n). If the condition is met, then we enter the new value into the array, if not, then the loop ends and the generated array is returned.

# Task 2
In the second task, we needed to write a function that would combine arrays, remove identical elements from them, and then sort in ascending order. The function for aligning an array will be described in the 8th task. We needed to write a function that would take two arrays, concatenate them, and remove duplicate items. To do this, we use the .concat method to concatenate the arrays and the flatArray function to flatten the array. Then, using the .filter function, we return a new array, where there will be only unique values, and at the end, using the .sort method, we sort the numbers, since the .sort method initially sorts the strings, we need to pass a callback to sort the numbers.

# Task 3
In the third task, we needed to search for a substring in a string. We pass two values ​​to the function - this is our string and the substring we are looking for. We use the .toLowerCase method on the string and substring to remove case-insensitivity. Then we call the .include method on our string, which shows if there is a substring in our string.

# Task 4
In the fourth task, it was necessary to write a function that would make a copy of an object, where keys are values ​​and values ​​are keys. We accept one parameter in our function, this is the object that we will copy. Then we create a new object and using the for ... in loop we go through all the properties of the object. In a loop, we create a property for a new object based on the value of the passed object and assign a value based on the key of the passed object.

# Task 5
In the fifth task, it was necessary to convert the object to a two-dimensional array of type [[key, value]]. To do this, we pass an object, create an empty array and use the for ... in loop to go through its properties. We add a new array to the array to make a two-dimensional array like [[ket, value]] and return the resulting array.

# Task 6
In the sixth task, we needed to write a function that would do uncamelize. To do this, we take a string and a separator, which we will use to separate words, use .split to make an array of characters from the string, and use .map to start working with each element of the string. Because all unicode uppercase values ​​are in the range 65 to 90, then we check if our character is in this range. If it is, then convert the character to lowercase and add a separator before it. Also, there is an additional check, if the first character of the string is uppercase, then it is also converted to lowercase. If the character is not in the required range, then we just return it. Then, in our modified array with a symbol, we use the .join method to create a string and return it.

# Task 7
In the seventh task, we needed to count the number of occurrences of a substring in a string. To do this, we take a string and a substring, the number of occurrences of which we are looking for. We call the .split method on the string, and specify our substring in the parameter, thereby turning our string into an array, for which our substring serves as the division. Then we subtract one from the dimension of this array and return this value. We subtract one because when we execute the .split method, we will always have an extra element, and this is what we subtract.

# Task 8
In the eighth task, we needed to write a function to align the array. To do this, we pass in an unaligned array. On this array, we call the .reduce method in order to iterate over all the elements of our array and form a new array at the output. In the .reduce method itself, we call the .concat method for each element to combine the arrays, and when combining, we check if our element is an array, then we again call the same function (i.e., make a resource), if the element is not an array, then we will attach it to a new array. Then we apply the .sort method to the resulting array with parameters for sorting numbers and return the resulting array.

# Task 9
In the ninth task, we needed to write a function that would remove null and undefined values ​​from an array. The function takes an array and a callback that will be called after 5 seconds. To call the callback after 5 seconds, we use the setTimeout function, into which we pass the callback, in which we are already calling our callback, which we passed to the function parameters. In our callback, we pass two parameters, the first is errors, since we do not have them, we pass null, and the second parameter is the execution of the .filter method on the array that we passed to return a new array without null and undefined elements.

# Task 10
In the tenth task, we needed to write a function that returns a promise that should be fulfilled in 6 seconds. To do this, we wrap the call to resolve with a setTimeout function. When we call our created function, we call the .then method in the function, where we pass the callback, which will be executed after the promise is fulfilled.

# Task 11
In the eleventh task, we needed to write a function that would take an array of promises and execute them one after another. For this, I created an asynchronous function to use the async await construct. In the function itself, using a for ... of loop, I iterate over all the elements of the array and write await before calling each element of the promise.

# Task 12
In the first part of the twelfth task, we had to make three parallel requests and process their responses. To do this, I wrote a function where the Promise.all method is called, which allows you to make parallel requests, for requests you need to use the fetch function, into which we pass the address to which we will make the request. Then, using the then method, we process the received responses. In my case, I get the element page by page using the document.getElementById method and change the innerHTML.

In the second part of the twelfth task, you had to write a function that will call the Promise.race method for two requests. To do this, we call the Promise.race method and pass an array of two elements into it, and in response we already receive one object, the properties of which we display using document.getElementById.

In the third part of the twelfth task, it was necessary to write a function that will return a list of cities in 3 seconds. Then another function that will send parallel requests based on the received cities and then display the received data on the html page.