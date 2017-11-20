const express = require('express');

//new express app
var app = express();


app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.send({
        name:'Jeremy',
        age:40,
        likes:['sleeping', 'relaxing']
    })
});

app.get('/about', (req, res)=>{
    res.send('About Page');
});
app.get('/bad', (req, res) =>{
    res.send({
        error:'Unable to fulfill this request'
    });
});

app.listen(3000, () => {
    console.log('Server up and running');
});