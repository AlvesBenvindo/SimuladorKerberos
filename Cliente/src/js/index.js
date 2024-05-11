
// const {descriptografar} = require('../../../parte_pratica/src/resources/criptografia');

const secretKey = '123456789';


const urlServidorAutenticacao = 'http://localhost:3000/autenticar'; // Substitua por URL real do servidor
const urlServidorConcessaoTicket = 'http://localhost:3000/solicitarTicketServico'; // Substitua por URL real do servidor
const urlServidorServico = 'http://localhost:3001/validarTicketServico'; // Substitua por URL real do servidor

const formLogin = document.getElementById('formLogin');
const formSolicitarTicket = document.getElementById('formSolicitarTicket');
const formOperacao = document.getElementById('formOperacao');
const resultadoLogin = document.getElementById('resultadoLogin');
const button_ancora = document.getElementById('button_ancora');
const button_ancoraB = document.getElementById('button_ancoraB');
// const resultadoTicket = document.getElementById('resultadoTicket');

class Cliente {
  constructor() {
    this.ticketAutenticao = null;
    this.ticketServico = null;
  }

  redirect () {
    if(this.ticketAutenticao) {
      if(this.obterTicketServico){
        setTimeout(() => {
          document.getElementById('login').classList.add('invisible');
          document.getElementById('ss').classList.remove('invisible');
        }, 2000);
      }else{
        setTimeout(() => {
          document.getElementById('auth').classList.add('invisible');
          document.getElementById('service').classList.remove('invisible');
        }, 2000);
      }
    }
  }

  async autenticar(nomeUsuario, senha) {
    // Criar mensagem de autenticação
    const mensagemAutenticacao = JSON.stringify({
      nomeUsuario: nomeUsuario,
      senha: senha,
    });

    await fetch(urlServidorAutenticacao, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: mensagemAutenticacao
    })
      .then(response => response.json())
      .then(data => {

        this.ticketAutenticao = data.ticketAutenticao;
        console.log(this.ticketAutenticao);
        setTimeout(() => {
          if (!data.estado) {
            resultadoLogin.innerHTML = data.mensagem;
            setTimeout(() => {
              resultadoLogin.innerHTML = '';
            }, 2000);
          } else {
            resultadoLogin.innerHTML = 'Autenticado com sucesso!';
            setTimeout(() => {
              resultadoLogin.innerHTML = '';
              setTimeout(() => {
                document.getElementById('auth').classList.add('invisible');
                document.getElementById('service').classList.remove('invisible');
              }, 2000);
            }, 1000);
          }
        }, 2000);

        // Habilitar formulário para solicitar ticket de serviço
      })
      .catch(error => {
        console.log('Erro ao comunicar com o servidor:', error);
        // resultadoLogin.textContent = 'Falha ao comunicar com o servidor.';
      });

  }

  async obterTicketServico(nomeServico) {

    const pedidoServico = JSON.stringify({
      tgt: this.ticketAutenticao,
      servico: nomeServico
    });

    if (!this.ticketAutenticao) {
      console.log('É necessário autenticar antes de solicitar um ticket de serviço');
      return;
    }

    await fetch(urlServidorConcessaoTicket, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: pedidoServico
    })
      .then(response => response.json())
      .then(data => {

        setTimeout(() => {
          if (!data.estado) {
            resultadoAuth.innerHTML = data.mensagem;
            setTimeout(() => {
              resultadoAuth.innerHTML = '';
            }, 1000);
          } else {
            resultadoAuth.innerHTML = 'Autorizacao concedida ao servico!';
            setTimeout(() => {
              resultadoAuth.innerHTML = '';
              setTimeout(() => {
                console.log('cheguei');
                document.getElementById('ancora').classList.remove('invisible');
                button_ancora.addEventListener('click', (event) => {
                  setTimeout( () => {
                    document.getElementById('login').classList.add('invisible');
                    setTimeout( () => {
                      document.getElementById('ss').classList.remove('invisible');
                    },1000);
                    
                  },1000);
                });
              }, 1000);
            }, 1000);
          }
          this.ticketServico = data.ticketServico;
          console.log('TGT: ', this.ticketAutenticao, 'TS: ', this.ticketServico);
        }, 1000);

        // Habilitar formulário para solicitar ticket de serviço
      })
      .catch(error => {
        console.log('Erro ao comunicar com o servidor:', error);
        // resultadoLogin.textContent = 'Falha ao comunicar com o servidor.';
      });

  }

  async utilizarServico(operacao, numero1, numero2) {
    if (!this.ticketServico) {
      console.log('É necessário obter um ticket de serviço para o serviço:');
      return;
    }

    // Criar mensagem para enviar ao serviço
    const servico = JSON.stringify({
      ticketServico: this.ticketServico,
      operacao: operacao,
      numero1: numero1,
      numero2: numero2
    });

    // Enviar mensagem para o servidor de serviço
    await fetch(urlServidorServico, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: servico
    })
      .then(response => response.json())
      .then(data => {

        setTimeout(() => {
          if (!data.estado) {
            resultadoServico.innerHTML = data.mensagem;
            setTimeout(() => {
              resultadoServico.innerHTML = '';
            }, 1000);
          } else {
            resultadoServico.innerHTML = 'Servico da calculadora, foi bem executada!';
            setTimeout(() => {
              resultadoServico.innerHTML = '';
              setTimeout(() => {
                console.log('cheguei');
                document.getElementById('resultado').innerHTML = data.result
                // window.location.href = 'src/pages/servico.html';
              }, 1000);
            }, 1000);
          }
          
          console.log('TGT: ', this.ticketAutenticao, 'TS: ', this.ticketServico);
        }, 2000);

        // Habilitar formulário para solicitar ticket de serviço
      })
      .catch(error => {
        console.log('Erro ao comunicar com o servidor:', error);
        // resultadoLogin.textContent = 'Falha ao comunicar com o servidor.';
      });
  }
}

// module.exports = Cliente;
const cliente = new Cliente();

cliente.redirect();


formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nomeUsuario = document.getElementById('nomeUsuario').value;
  const senha = document.getElementById('senha').value;

  cliente.autenticar(nomeUsuario, senha);

});

formOperacao.addEventListener('submit', async (event) => {
  event.preventDefault();

  const operacao = document.getElementById('operacao').value;
  const numero1 = document.getElementById('numero1').value;
  const numero2 = document.getElementById('numero2').value;

  cliente.utilizarServico(operacao, numero1, numero2);

});

formSolicitarTicket.addEventListener('submit', (event) => {
  event.preventDefault();

  const nomeServico = document.getElementById('nomeServico').value;
  console.log('solicitando: ', nomeServico);

  cliente.obterTicketServico(nomeServico);

});

button_ancoraB.addEventListener('click', (event) => {
  setTimeout( () => {
    document.getElementById('ss').classList.add('invisible');
    setTimeout( () => {
      document.getElementById('login').classList.remove('invisible');
    },1000);
    
  },1000);
});