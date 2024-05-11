const criptografia = require('./criptografia');

class TicketServico {
  constructor(servico, userName) {
    this.servico = servico;
    this.userName = userName;
    this.dados = null;
    this.criptografado = null;
  }

  criptografar(chaveSecreta) {
    this.criptografado = criptografia.criptografar(JSON.stringify(this), chaveSecreta);
  }

  descriptografar(chaveSecreta) {
    const mensagemDecifrada = criptografia.descriptografar(this.criptografado, chaveSecreta);
    this.dados = JSON.parse(mensagemDecifrada);
  }
}

module.exports = TicketServico;