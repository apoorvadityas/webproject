const express = require ('express')
const app = express () ;
app.listen(3000);


app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('home_images'));


app.get('/',(req,res) => {
    res.sendFile('index.html', { root: __dirname });
    });
app.get('/AboutUs',(req,res) => {
    res.sendFile('Aboutus.html', { root: __dirname });
     });
app.get('/careers',(req,res) => {
    res.sendFile('loginpage.html', { root: __dirname });
            
    });
