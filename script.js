// Função de login simples
function login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Simulação de login com dois usuários
    if ((usuario === "Adriano" && senha === "1234") || (usuario === "Mike" && senha === "5678")) {
        localStorage.setItem('usuario', usuario);
        document.getElementById('nomeUsuario').innerText = usuario;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
        carregarAtividades();
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

// Função para registrar atividade
function registrarAtividade() {
    const cliente = document.getElementById('cliente').value;
    const atividade = document.getElementById('atividade').value;
    const inicio = document.getElementById('inicio').value;
    const fim = document.getElementById('fim').value;
    const usuario = localStorage.getItem('usuario');

    if (!cliente || !atividade || !inicio || !fim) {
        alert("Preencha todos os campos!");
        return;
    }

    const novaAtividade = {
        cliente: cliente,
        usuario: usuario,
        atividade: atividade,
        inicio: inicio,
        fim: fim,
        total: calcularTotalHoras(inicio, fim)
    };

    salvarAtividadeLocalmente(novaAtividade);
    adicionarAtividadeNaTela(novaAtividade);
}

// Função para calcular o total de horas
function calcularTotalHoras(inicio, fim) {
    const inicioDate = new Date(inicio);
    const fimDate = new Date(fim);
    const diffMs = fimDate - inicioDate;
    const diffHoras = diffMs / (1000 * 60 * 60);
    return diffHoras.toFixed(2);
}

// Função para salvar localmente (IndexedDB)
function salvarAtividadeLocalmente(atividade) {
    let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    atividades.push(atividade);
    localStorage.setItem('atividades', JSON.stringify(atividades));

    // TODO: Implementar sincronização com GitHub Pages
}

// Função para carregar atividades do localStorage
function carregarAtividades() {
    const atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    atividades.forEach(adicionarAtividadeNaTela);
}

// Função para adicionar uma atividade à lista na tela
function adicionarAtividadeNaTela(atividade) {
    const lista = document.getElementById('listaAtividades');
    const item = document.createElement('li');
    item.innerText = `${atividade.cliente} - ${atividade.usuario} - ${atividade.atividade} - Total: ${atividade.total}h`;
    lista.appendChild(item);
}
