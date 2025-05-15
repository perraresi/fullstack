const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;


var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;


const uri = `mongodb+srv://phferraresi:0EZYJgHX3ux67zxT@fullstack.xczetsn.mongodb.net/?retryWrites=true&w=majority&appName=Fullstack
`;


const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("pedro_bd");
var usuarios = dbo.collection("usuarios");

app.post("/cadastrar_usuario", function(req, resp) {
    var data = { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha };

    usuarios.insertOne(data, function (err) {
      if (err) {
        resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
      }else {
        resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
      };
    });
   
  });

  app.post("/logar_usuario", function(req, resp) {
    var data = {db_login: req.body.login, db_senha: req.body.senha };

    usuarios.find(data).toArray(function(err, items) {
      console.log(items);
      if (items.length == 0) {
        resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
      }else if (err) {
        resp.render('resposta_usuario', {resposta: "Erro ao logar usuário!"})
      }else {
        resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!"})        
      };
    });

  });






app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const usuarios2 = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'projetos.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login.html'));
});

app.get('/cadastra', (req, res) => {
  res.sendFile(path.join(__dirname, 'Cadastro.html'));
});

app.post('/cadastra', (req, res) => {
  const { usuario, senha } = req.body;
  usuarios2.push({ usuario, senha });
  res.render('resposta', { mensagem: 'Usuário cadastrado com sucesso!' });
});

app.post('/logar', (req, res) => {
  const { usuario, senha } = req.body;
  const existe = usuarios2.find(u => u.usuario === usuario && u.senha === senha);
  if (existe) {
    res.render('resposta', { mensagem: `Login bem-sucedido! Bem-vindo, ${usuario}` });
  } else {
    res.render('resposta', { mensagem: 'Usuário ou senha inválidos!' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});