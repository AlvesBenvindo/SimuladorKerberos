const Ticket = require('../resources/ticket');
const TicketServico = require('../resources/ticketServico');
const criptografia = require('../resources/criptografia');
const bd = require('./fakeDataBase/bd.json');
const skf = require('./fakeDataBase/sessionKey.json');
const fs = require('fs');

const path = '/home/by-default/Documentos/4º Ano/II Semestre/Sistemas Distribuídos/parte_pratica/src/assets/sessionKeyFile.txt';

class ServidorConcessaoTicket {
  constructor() {
    this.servicos = bd.servicos;
  }

  processarMensagem(dados) {

    if (skf.length==0) {
      console.log('lista vazia');
      return  false;
    }

    console.log(skf);
    // return false;
    for(let i=0; i<skf.length; i++){
      if(skf[i].key==dados.tgt.chaveSessao) return true;
    }
    return false;
  }

  concederTicketServico(dados, dadosTicket = null) {

    if(this.processarMensagem(dados)){
      const idServico = dados.servico;
      console.log(112222211,idServico)

      for(let i=0; i<this.servicos.length; i++){
        if(this.servicos[i].id==idServico){
          dadosTicket = this.servicos[i];
          console.log(dadosTicket, this.servicos[i].key)
        }
      }

      // Validar ticket de autenticação
      if (Date.now() - dados.tgt.timestamp > 60000000000) {
        let erro = {estado: false, mensagem: 'Ticket de autenticação inválido ou expirado'};
        console.log(erro.mensagem);
        return erro;
      }

      // Gerar ticket de serviço
      const ticketServico = new TicketServico(dadosTicket, dados.tgt.nome);
      // ticketServico.criptografar(chavesSecretas[ticketServico.idServico]);

      // Enviar ticket de serviço para o cliente
      const result = {
        estado: true,
        ticketServico: ticketServico
      };

      console.log('Ticket de serviço concedido:', result);

      return result;
    }else{
      let erro = {estado: false, mensagem: 'Ticket de  inválido, deve autenticar-se antes de pedir o serviço'};
      console.log(erro.mensagem);
      return erro;
    }
  }
}

module.exports = ServidorConcessaoTicket;