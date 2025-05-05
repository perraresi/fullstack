const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const usuarios = [];

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
  usuarios.push({ usuario, senha });
  res.render('resposta', { mensagem: 'Usuário cadastrado com sucesso!' });
});

app.post('/logar', (req, res) => {
  const { usuario, senha } = req.body;
  const existe = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  if (existe) {
    res.render('resposta', { mensagem: `Login bem-sucedido! Bem-vindo, ${usuario}` });
  } else {
    res.render('resposta', { mensagem: 'Usuário ou senha inválidos!' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});