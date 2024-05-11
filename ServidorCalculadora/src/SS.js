const Ticket = require('../../parte_pratica/src/resources/ticket');
const criptografia = require('../../parte_pratica/src/resources/criptografia');

const secretKey = 100000;

class ServidorServico {
  constructor() {}

  processarMensagem(dados) {

    if(dados.ticketServico.servico.key==secretKey) return true;
    return false;

  }

  executarOperacaoMatematica(dados) {

    const estado = this.processarMensagem(dados);

    const operacao = dados.operacao;
    const numero1 = dados.numero1;
    const numero2 = dados.numero2;

    if(estado){
      // Executar operação matemática
      let resultado;
      switch (operacao) {
        case '+':
          resultado = Number(numero1) + Number(numero2);
          break;
        case '-':
          resultado = numero1 - numero2;
          break;
        case '*':
          resultado = numero1 * numero2;
          break;
        case '/':
          if (numero2 === 0) {
            console.log('Divisão por zero');
            return {estado: false, mensagem: 'Divisão por zero'};
          }
          resultado = numero1 / numero2;
          break;
        default:
          console.log('Operação matemática inválida:', operacao);
          return {estado: false, mensagem: 'Operação matemática inválida:'+operacao};
      }

      // Enviar resultado para o cliente
      console.log('Resultado da operação matemática:', resultado);
      return {estado: true, result: resultado}
    }
    return {estado: false, mensagem: 'Ticket de Serviço Inválido!!!'}
  }
}

module.exports = ServidorServico;
