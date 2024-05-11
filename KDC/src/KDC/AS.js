const Ticket = require('../resources/ticket');
const criptografia = require('../resources/criptografia');
const bd = require('./fakeDataBase/bd.json');
const skf = require('./fakeDataBase/sessionKey.json');
const fs = require('fs');

const sessionKeyList = [];
const path = '/home/by-default/Documentos/4º Ano/II Semestre/Sistemas Distribuídos/parte_pratica/src/assets/sessionKeyFile.txt';

class ServidorAutenticacao {
  constructor() {
    this.clientes = bd.clientes;
  }

  processarMensagem(mensagem) {}

  autenticarUsuario(credenciais, estado = false, chave = '', sessaoKey = '', timestamp = 0) {
    const userName = credenciais.nomeUsuario;
    const senhaUsuario = credenciais.senha;
    let userNameTicket;
    let listKey;
    let lista = [];

    console.log(userName, senhaUsuario);

    for (let i=0; i<this.clientes.length; i++){
      if(this.clientes[i].userName==userName && this.clientes[i].senha==senhaUsuario)
      {
        userNameTicket = this.clientes[i].nome;
        chave = this.clientes[i].key;
        sessaoKey = Math.random();
        timestamp = Date.now();
        skf.push({user:this.clientes[i].id,key: sessaoKey, time: timestamp});
        console.log(1123,skf);
        // return false;
        fs.writeFile(
          "/home/by-default/Documentos/4º Ano/II Semestre/Sistemas Distribuídos/parte_pratica/src/KDC/fakeDataBase/sessionKey.json", 
          JSON.stringify(skf),
          (err)=>{
            if(err){
              console.log('Erro ao escrever no arquivo: ', err);
              return;
            }
            console.log("Chave de sessao gravada com sucesso em: sessionKey.json");
          }
        );
        estado = true;
        
        break;
      }
    }

    if (estado==false) {
      const erro = {estado, mensagem: 'Autenticação falhou: credenciais erradas'};
      return erro;
    }

    const ticketAutenticao = new Ticket(userNameTicket, timestamp, sessaoKey);
    // ticketAutenticao.criptografar(chave);
    console.log('Ticket de autenticação enviado:', ticketAutenticao);
    const result = { estado, ticketAutenticao }
    return result;
  }

}

module.exports = ServidorAutenticacao;
