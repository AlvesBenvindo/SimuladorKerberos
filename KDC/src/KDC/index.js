const express = require('express');
const Ticket = require('../resources/ticket');
const criptografia = require('../resources/criptografia');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const ServidorAutenticacao = require('./AS');
const ServidorConcessaoTicket = require('./TGS');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: '*'}));

const portKDC = 3000; // Definir porta para o servidor KDC

app.get('/', (req, res) => {
  res.json({'message': 'Olá Mundo! Seja bem-vindo Kerberos Authenticate Simulator (KAS)'})
  // Implementar lógica de autenticação e emissão de TGT
});

// Endpoint para autenticação de usuários e emissão de TGTs
app.post('/autenticar',  (req, res) => {
  const AS = new ServidorAutenticacao();
  console.log('dados da requisição: ', req.body);
  const resposta = AS.autenticarUsuario(req.body);
  console.log('resposta: ',resposta);
  return res.status(200).json(resposta)
  // Implementar lógica de autenticação e emissão de TGT
});

// Endpoint para solicitar STs com base em TGTs válidos
app.post('/solicitarTicketServico', (req, res) => {
  // Implementar lógica de validação de TGT e emissão de ST
  const TGS = new ServidorConcessaoTicket();
  console.log('dados da requisição: ', req.body);
  const resposta = TGS.concederTicketServico(req.body);
  console.log('resposta: ',resposta);
  return res.status(200).json(resposta)
});

// Endpoint para validar STs e conceder acesso a recursos protegidos
app.post('/validarTicketServico', (req, res) => {
  // Implementar lógica de validação de ST e concessão de acesso
});

// Iniciar servidor KDC
app.listen(portKDC, () => {
  console.log(`Servidor KDC em execução na porta ${portKDC}`);
});