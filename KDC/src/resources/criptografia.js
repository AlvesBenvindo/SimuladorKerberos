const crypto = require('node:crypto');

function criptografar(mensagem, chaveSecreta) {
  const cifrar = crypto.createCipheriv('aes-256-cbc', chaveSecreta);
  const iv = cifrar.update('');
  return iv + cifrar.final(mensagem);
}

function descriptografar(mensagemCriptografada, chaveSecreta) {
  const decifrar = crypto.createDecipheriv('aes-256-cbc', chaveSecreta);
  return decifrar.update(mensagemCriptografada) + decifrar.final();
}

module.exports = {
  criptografar,
  descriptografar
};
