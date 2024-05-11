const criptografia = require('./criptografia');

class Ticket {
  constructor(userName, timestamp, sessaoKey) {
    this.nome = userName;
    this.timestamp = timestamp;
    this.chaveSessao = sessaoKey;
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

module.exports = Ticket;