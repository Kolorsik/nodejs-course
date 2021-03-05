# Russian
## Домашняя работа 2
## Задание
Нужно было дописать код в предоставленных скриптах

### cleanup.js
В этом файле нужно было написать скрипт для очистки и удаления определённой директории и в конце экспортировать эту функцию для последующего вызова. Для этого нам нужно было подключить модуль fs и вызвать у него метод .rmdirSync, куда мы передали название директория и опцию recursive: true. И в конце мы экспортировали функцию в помощью exports.cleanup.

### prepare.js
В этом файле у нас есть функция prepareWorkspace, которая должна вызывать три фукнции. Нам нужно было написать четыре функции. Для всех функций нам нужно подключить модуль fs. Первая функция checkGitignore, которая должна проверять наличие файла .gitignore, если файл найден то вывести соответствующее сообщение к консоль, если файл не найден, то будет вызвана ошибка. Для проверки наличия файла мы вызываем метод .existsSync у модуля fs.

Во второй функции checkDataFolder нам нужно проверить наличие директории data в папке проекта. Для этого мы используем метод .existsSync модуля fs. Если директория найдена, то нам нужно нужно проверить, файлы с какими названиями находятся в директории data. Если названия файлов совпадают с названиями из файла resources.json, то вывести успешное сообщение в консоль, если же директория data или названия файлов в директории data не совпадают с названиями из файла resources.json, то вывести соответствующую ошибку в консоль.

В третьей функции checkOutputFolder мы проверяем наличие директории output в директории проекта. Если директория output найдена, то нам нужно вызвать функцию из файла cleanup.js, которую мы экспортировали. После вызова cleanup вывести соответствующую ошибку. Если же директория output была не найдена, то вызвать функцию createOutputFolder.

В четвёртой функции createOutputFolder нам нужно создать директорию output. Для этого мы используем метод .mkdir модуля fs.

И с самом конце мы с помощью module.exports экспортируем нашу функцию prepareWorkspace.

### listener.js
В этой функции нам нужно было написать пять функций для слушателей наших событий. Первая функция это listenerForPrepare, которая выводит сообщение в консоль, о том, что событие prepare было вызвано и какие-нибудь дополнительные сообщения, если они есть.

Вторая функция это listenerSecond, которая выводит сообщение в консоль, о том, что событие dealWithEventsInStreamsInFs было вызвано и какие-нибудь дополнительные сообщения, если они есть.

Третья функция это listenerThird, которая выводит сообщение в консоль, о том, что событие dealWithStreamsInFs было вызвано и какие-нибудь дополнительные сообщения, если они есть.

Четвёртая функция это chunkListener, которая выводит количество чанков, считанных с файла.

Пятая функция это errorListener, которая выводит ошибку в консоль, если было вызвано соответствующее событие.

В самом конце, мы экспортируем функцию, в которой ставим все вышеописанные фукнции на прослушку при вызове определённых событий.

### fileProcessor.js
В этом файле нам нужно было дописать методы класса FileProcessor. Первый метод, это метод run, который вызывает фукнцию prepare, которую мы описывали в файле prepare.js. После вызывается событие prepare и вызываются два метода этого же класса: dealWithEventsInStreamsInFs и dealWithStreamsInFs.

В методе dealWithEventsInStreamsInFs мы вначале вызываем событие dealWithEventsInStreamsInFs. Потом мы объявляем переменную chunks, с помощью которой мы будем считать количество чанков при считывании информации из файла. Потом с помощью метода createReadStream модуля fs мы открываем поток на чтение из файла x.txt и указываем в опциях кодировку, с помощью encoding: 'utf-8'. Потом у потока чтения мы начинаем слушать событие data, и при этом событии при инкрементируем переменную chunks, создаём потом на запись в файл newTxt.txt с опцией flags: 'a', которая позволяет дописывать в файл и записываем с помощью потока на запись полученный chunk у потока для чтения. Потом мы слушаем событие end, которое показывает что чтение из файла завершено, и при вызове этого события мы самостоятельно вызываем событие chunkListener и передаём туда количество посчитанных чанков. В самом же конце, мы выводим сообщение в консоль о успешном завершении всего метода.

В методе dealWithStreamsInFs мы сразу вызываем событие dealWithStreamsInFs. Потом мы создаём поток на чтение и на запись и с помощью метода .pipe мы передаёи данные с потока на чтение в поток на запись. Так же бы слушаем событие end потока на чтение, чтобы понять, когда запись в файл завершилась. Так же ещё слушаем событие error, чтобы знать, произошла ли ошибка. В самом конце вы экспортируем класс FileProcessor.

### index.js
Этот файл является основным. Мы импортируем класс fileProcessor и функцию registerAllListeners. Потом, мы вызываем функцию registerAllListeners, чтобы зарегистрировать все слушатели событий и вызываем метод fileProcessor.run, чтобы весь наш скрипт начал работу.

# English
## HomeWork 2
## Task
It was necessary to add the code in the provided scripts

## cleanup.js
In this file, it was necessary to write a script to clean up and delete a specific directory and, at the end, to export this function for subsequent call. To do this, we needed to import the fs module and call the .rmdirSync method on it, where we passed the name of the directory and the recursive: true option. Finally, we exported the function using exports.cleanup.

## prepare.js
In this file, we have a prepareWorkspace function that should call three functions. We needed to write four functions. For all functions, we need to include the fs module. The first function is checkGitignore, which should check for the existence of the .gitignore file, if the file is found, then output a corresponding message to the console, if the file is not found, then an error will be raised. To check if a file exists, we call the .existsSync method on the fs module.

In the second function checkDataFolder, we need to check for the presence of the data directory in the project folder. For this we use the .existsSync method of the fs module. If the directory is found, then we need to check the files with what names are in the data directory. If the names of the files match the names from the resources.json file, then output a successful message to the console, if the data directory or the names of the files in the data directory do not match the names from the resources.json file, then output the corresponding error to the console.

In the third function, checkOutputFolder, we check for the presence of an output directory in the project directory. If the output directory is found, then we need to call the function from the cleanup.js file that we exported. After calling cleanup, print the appropriate error. If the output directory was not found, then call the createOutputFolder function.

In the fourth function, createOutputFolder, we need to create the output directory. For this we use the .mkdir method of the fs module.

And right at the end, we use module.exports to export our prepareWorkspace function.

## listener.js
In this function, we needed to write five functions for our event listeners. The first function is listenerForPrepare, which prints a message to the console that the prepare event was called and any additional messages, if any.

The second function is listenerSecond, which prints a message to the console that the dealWithEventsInStreamsInFs event has been called and any additional messages, if any.

The third function is listenerThird, which prints a message to the console that the dealWithStreamsInFs event has been called and any additional messages, if any.

The fourth function is chunkListener, which outputs the number of chunks read from the file.

The fifth function is errorListener, which prints an error to the console if the corresponding event has been raised.

At the very end, we export a function in which we put all the above functions on a wiretap when certain events are called.

## fileProcessor.js
In this file, we needed to add the methods of the FileProcessor class. The first method is the run method, which calls the prepare function, which we described in the prepare.js file. Then the prepare event is called and two methods of the same class are called: dealWithEventsInStreamsInFs and dealWithStreamsInFs.

In the dealWithEventsInStreamsInFs method, we first call the dealWithEventsInStreamsInFs event. Then we declare the chunks variable, with which we will count the number of chunks when reading information from the file. Then, using the createReadStream method of the fs module, we open the stream for reading from the x.txt file and specify the encoding in the options using encoding: 'utf-8'. Then we start listening to the data event at the read stream, and at this event we increment the chunks variable, then create it for writing to the newTxt.txt file with the flags: 'a' option, which allows us to write to the file and write the received chunk using the stream. the stream is readable. Then we listen to the end event, which indicates that reading from the file is completed, and when this event is called, we ourselves call the chunkListener event and pass the number of counted chunks there. At the very end, we print a message to the console about the successful completion of the entire method.

In the dealWithStreamsInFs method, we immediately call the dealWithStreamsInFs event. Then we create a stream for reading and writing and using the .pipe method we transfer data from the stream for reading to the stream for writing. We would also listen to the end event of the read stream in order to understand when the write to the file has completed. We also listen to the error event to know if an error has occurred. At the very end, you export the FileProcessor class.

## index.js
This file is the main one. We import the fileProcessor class and registerAllListeners function. Then, we call the registerAllListeners function to register all event listeners and call the fileProcessor.run method to get our entire script to run.