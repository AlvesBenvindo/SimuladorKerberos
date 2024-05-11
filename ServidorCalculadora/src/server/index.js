const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const ServidorServico = require('../SS');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: '*'}));

const port = 3001; // Definir porta para o servidor KDC

app.get('/', (req, res) => {
  res.json({'message': 'Olá Mundo! Seja bem-vindo ao Servidor de Serviço (Calculadora), vinculado ao  Kerberos Authenticate Simulator (KAS)'})
  // Implementar lógica de autenticação e emissão de TGT
});

// Endpoint para validar STs e conceder acesso a recursos protegidos
app.post('/validarTicketServico', (req, res) => {
  // Implementar lógica de validação de ST e concessão de acesso
  const SS = new ServidorServico();
  console.log('dados da requisição: ', req.body);
  const resposta = SS.executarOperacaoMatematica(req.body);
  console.log('resposta: ',resposta);
  return res.status(200).json(resposta)
});

// Iniciar servidor KDC
app.listen(port, () => {
  console.log(`Servidor KDC em execução na porta ${port}`);
});