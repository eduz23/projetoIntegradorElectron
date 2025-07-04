
const tabelaNotas = document.getElementById('dadosNotaTable');

const modalIdNota = document.getElementById('nota-id');
const modalNomeAluno = document.getElementById('aluno-id');
const modalNomeDisciplina = document.getElementById('disciplina-id');
const modalNota = document.getElementById('notaFinal-id')
const filtro = document.getElementById('filtro')
const mensagemMedia = document.getElementById('msgResultado')
const mensagemConclusao = document.getElementById('msgConclusao')

const botaoCalcular = document.getElementById('btn-calcular')
const botaoFiltrar = document.getElementById('btn-filtrar')
const botaoLimpar = document.getElementById('btn-limpar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');

botaoCalcular.addEventListener('click', calcularMedia)
botaoFiltrar.addEventListener('click', filtrarNota)
botaoExcluir.addEventListener('click', deletarNota);
botaoLimpar.addEventListener('click', limpar);
botaoSalvar.addEventListener('click', adicionarAlterarNota);

function mostrarDetalhes(id, id_aluno, id_disciplina, nota){
    modalIdNota.value = id;
    modalNomeAluno.value = id_aluno;
    modalNomeDisciplina.value = id_disciplina
    modalNota.value = nota;
}

function limpar(){
    modalIdNota.value = '';
    modalNomeAluno.value = '';
    modalNomeDisciplina.value = '';
    modalNota.value = '';
}

function criarLinhaNota(nota){
    const linha = document.createElement('tr');

    const celulaAluno = document.createElement('td');
    celulaAluno.textContent = nota.aluno; // nome do aluno
    linha.appendChild(celulaAluno);

    const celulaDisciplina = document.createElement('td');
    celulaDisciplina.textContent = nota.disciplina; // nome da disciplina
    linha.appendChild(celulaDisciplina);

    const celulaNota = document.createElement('td');
    celulaNota.textContent = nota.nota;
    linha.appendChild(celulaNota);

    const celulaBotao = document.createElement('td');
    const botao = document.createElement("button");

    botao.addEventListener("click",
        function () {
            mostrarDetalhes(nota.id, nota.id_aluno, nota.id_disciplina, nota.nota);
        }
    );

    const icone = document.createElement("i");
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaNotas.appendChild(linha);
}


async function carregarNotas(){
    
    const listaNota = await window.funcaoAPI.buscarNota()
    tabelaNotas.innerHTML = ""

    listaNota.forEach(criarLinhaNota)

    if (!listaNota.length === 0) {
        tabelaNotas.textContent = "sem dados"
    }

    await carregarAlunos();
    await carregarDisciplinas();
    lucide.createIcons();

    let local = localStorage.getItem('perfil')
    if(local !== 'adm'){
        botaoSalvar.disabled = true
        botaoExcluir.disabled = true
    }
}

async function adicionarNota(){
    await window.funcaoAPI.adicionarNota(modalNomeAluno.value, modalNomeDisciplina.value, modalNota.value)
    limpar()
    carregarNotas()
    mensagemConclusao.textContent = 'Nota adicionada com sucesso!'
}

async function alterarNota() {
    await window.funcaoAPI.alterarNota(modalIdNota.value, modalNomeAluno.value, modalNomeDisciplina.value, modalNota.value)
    carregarNotas()
    limpar()
    mensagemConclusao.textContent = 'Nota alterada com sucesso!'
}

async function deletarNota(){
    const id = modalIdNota.value
    
    await window.funcaoAPI.excluirNota(id)
    limpar()
    carregarNotas()
    mensagemConclusao.textContent = 'Nota deletada com sucesso!'
}

function adicionarAlterarNota(){
    if(modalIdNota.value != ''){
        alterarNota()
    }

    else{
        adicionarNota()
    }
}

let notasFiltradas;

// Função para filtrar notas

async function filtrarNota() {
    const nome = filtro.value.trim()

    let nota;

    if(nome === ''){
        nota = await window.funcaoAPI.buscarNota()
    }
    else{
        nota = await window.funcaoAPI.filtrarNota(nome)
    }

    notasFiltradas = nota

    tabelaNotas.innerHTML = ''
    console.log(nota)
    nota.forEach(criarLinhaNota)

    if(!nota.length){
        tabelaNotas.textContent = 'Sem dados'
    }

    lucide.createIcons()
}

// Função para caclular média do aluno com a funcao de filtrar

function calcularMedia() {
    if (!Array.isArray(notasFiltradas) || notasFiltradas.length === 0) {
        mensagemMedia.textContent = 'Filtre um aluno primeiro para calcular a média.'
        return;
    }

    let soma = 0;
    notasFiltradas.forEach(n => {
        soma += parseFloat(n.nota);
    });

    const media = soma / notasFiltradas.length;
    const nomeAluno = notasFiltradas[0].aluno

    mensagemMedia.textContent = `Média do aluno ${nomeAluno} é ${media.toFixed(1)}`;
}

// Função para mostrar detalhes do aluno no select
function mostrarDetalhesAluno(aluno){
    
    let option = document.createElement('option')

    option.value = aluno.id
    option.textContent = aluno.nome
    
    modalNomeAluno.appendChild(option)
}

async function carregarAlunos() {
    modalNomeAluno.innerHTML = ''
    let listaAlunos = await window.funcaoAPI.buscarAlunos()
    listaAlunos.forEach(mostrarDetalhesAluno)
    console.log(listaAlunos)
}

// Função para mostrar detalhes da matéria no select
function mostrarDetalhesDisciplina(disciplina){
    let option = document.createElement('option')

    option.value = disciplina.id
    option.textContent = disciplina.nome

    modalNomeDisciplina.appendChild(option)
}

async function carregarDisciplinas() {
    modalNomeDisciplina.innerHTML = ''
    let listaMaterias = await window.funcaoAPI.buscarDisciplinas()
    listaMaterias.forEach(mostrarDetalhesDisciplina)
    console.log(listaMaterias)
}

carregarNotas();