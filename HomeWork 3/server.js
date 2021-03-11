const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./router');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// TODO: install all required dependencies to package.json
// TODO: add logic for parsing application/json (app.use(...)) (use 'body-parser' library)

app.use(function logMethodAndUrl(request, response, next) {
    console.log(`${request.method} ${request.url}`)
    next()
})

app.get('/', (req, res) => {
    res.end('This is a simple request');
});


app.get('/health-check', (req, res) => {
    res.json({
        date: new Date,
        message: 'Server is running'
    });
})

routers(app);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Server is listening on ${port}`)
})

