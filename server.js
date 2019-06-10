const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose');
var User = require('./model/User.model');
let expressValidator = require('express-validator');
const port = process.env.PORT || 5000

// app.configure(function(){
//   app.use(express.bodyParser());
// });
app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições
app.use(bodyParser.json())

// var port = 27017;
var db = 'mongodb://localhost/signup3'// LOCAL
// var db = 'mongodb+srv://Luz:luz07@cluster0-cngjv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(db);
var connection = mongoose.connection;

mongoose.connection.on('error',function (err) {  
  console.log('Erro na conexão Mongoose padrão ...: ' + err);
});

connection.once('open', function(){
  console.log("Conectado ao MongoDB");
});
app.use(expressValidator());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/cadastrar', function(req, res) {
    var newUser = new User();

    newUser.nome = req.body.nome;
    newUser.sobrenome = req.body.sobrenome;
    newUser.email = req.body.email;
    newUser.curso = req.body.curso;
     newUser.senha = req.body.senha;
    


    newUser.save(function(err, user) {
      if(err) {
        // res.send('error saving user');
        res.render('pages/home')
      } else {
        res.render('pages/logado')
        console.log(user);
        // res.send(user);
      }
    });
  });

  app.post('/autenticar', (req, res) => {
    var dadosForm = req.body;
    // console.log(dadosForm)
    // res.send(req.body.senha + req.body.email + '! uhuu!')
        connection.db.collection("users", function(err, collection){  
        collection.find({}).toArray(function(err, data){
          let validar= false;
      
          // console.log(dadosForm)
          // console.log(req.body.email)
        for(var i = 0; i < data.length; i++) {
       

          if (data[i].email == req.body.email & data[i].senha == req.body.senha) {
            validar = true;
          }
         
        }

        if (validar ==  true) {
          res.render('pages/logado', { data})
          console.log(data)
        } else {
          res.render('pages/home')
        }
        }) 
      })       
})
 


app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`A mágica acontece em http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render('pages/home')
})

// app.get('/login', (req, res) => {
//     res.render('pages/login')
// })

app.get('/logado', (req, res) => {
    res.render('pages/home')
})

app.post('/signup', (req, res) => {
    res.render('pages/signup')
})

app.get('/entrada', (req, res) => {
    res.render('pages/home')
})
