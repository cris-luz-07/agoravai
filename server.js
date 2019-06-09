const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose');
var User = require('./model/User.model');
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições

// var port = 27017;
var db = 'mongodb://localhost/signup'
mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/user', function(req, res) {
    var newUser = new User();
  
    newUser.nome = req.body.nome;
    newUser.sobrenome = req.body.sobrenome;
    newUser.email = req.body.email;
    newUser.senha = req.body.senha;

    newUser.save(function(err, user) {
      if(err) {
        res.send('error saving user');
      } else {
        console.log(user);
        res.send(user);
      }
    });
  });

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`A mágica acontece em http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.get('/logado', (req, res) => {
    res.render('pages/logado')
})

app.post('/signup', (req, res) => {
    res.render('pages/signup')
})

app.get('/entrada', (req, res) => {
    res.render('pages/entrada')
})
