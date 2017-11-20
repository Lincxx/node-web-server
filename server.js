const express = require('express');
const hbs     = require('hbs');

//new express app
var app = express();

//exppress configurations 
app.set('view engine', 'hbs');

//middleware -
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home', {
        welcomeMessage: 'Welcome to the home page',
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
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