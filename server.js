const express = require('express');
const hbs     = require('hbs');

//new express app
var app = express();

//exppress configurations 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware -
app.use(express.static(__dirname + '/public'));

//This is a hbs helper function and it will be looked for first
//We are using this because we were passing the currentYear twice
//takes 2 parameter - first the name of the helper and then the function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home', {
        welcomeMessage: 'Welcome to the home page',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        error:'Unable to fulfill this request'
    });
});

app.listen(3000, () => {
    console.log('Server up and running');
});