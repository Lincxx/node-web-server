const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');
const port    = process.env.PORT || 3000;

//new express app
var app = express();

//////////////
//express configurations
/////////////
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//////////////
//Middleware
/////////////
//an empty middleware will cause your app not to run or no call to next
app.use((req, res, next) => {
    //logger
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to sever.log')
        }
    });
    next();
});

//maintenance middleware
// app.use((req, res, next) => {
//     res.render('maintenance');
// });

//we moved this to keep it from firing first and exposing the public while in maintenance mode
app.use(express.static(__dirname + '/public'));


//////////////
//Helpers
/////////////
//This is a hbs register helper function and it will be looked for first
//hbs register helper can take arguments
//We are using this because we were passing the currentYear twice
//takes 2 parameter - first the name of the helper and then the function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//////////////
//Routes
/////////////
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home', {
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) =>{
    res.render('projects', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'Portfolio page here',
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        error:'Unable to fulfill this request'
    });
});



//////////////
//Server
/////////////
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});