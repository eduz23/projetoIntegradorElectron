
const tabelaNotas = document.getElementById('dadosNotaTable');

const modalIdNota = document.getElementById('nota-id');
const modalNomeAluno = document.getElementById('aluno-id');
const modalNomeDisciplina = document.getElementById('disciplina-id');
const modalNota = document.getElementById('nota-id')

const botaoLimpar = document.getElementById('btn-limpar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');

botaoExcluir.addEventListener('click', deletarNota);
botaoLimpar.addEventListener('click', limpar);
botaoSalvar.addEventListener('click', adicionarAlterarNota);

function mostrarDetalhes(id, Aluno, Disciplina, nota){
    modalIdNota.value = id;
    modalNomeAluno.value = Aluno;
    modalNomeDisciplina.value = Disciplina
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
    celulaAluno.textContent = nota.aluno;
    linha.appendChild(celulaAluno);

    const celulaProfessor = document.createElement('td');
    celulaProfessor.textContent = nota.disciplina;
    linha.appendChild(celulaProfessor);

    const celulaNota = document.createElement('td');
    celulaNota.textContent = nota.nota;
    linha.appendChild(celulaNota);

    const celulaBotao = document.createElement('td');
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(nota.id, nota.aluno, nota.disciplina, nota.nota); }
    );
    botao.textContent = '';

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

    if (!listaNota.length > 0) {
        tabelaNotas.textContent = "sem dados"
    }

    carregarAlunos();
    carregarDisciplinas();
    lucide.createIcons();
}

async function adicionarNota(){
    await window.funcaoAPI.adicionarNota(modalNomeAluno.value, modalNomeDisciplina.value, modalNota.value)
    limpar()
    carregarNotas()
}

async function alterarNota() {
    await window.funcaoAPI.alterarNota(modalIdNota.value, modalNomeAluno.value, modalNomeDisciplina.value, modalNota.value)
    limpar()
    carregarNotas()
}

async function deletarNota(){
    const id = modalIdNota.value
    
    await window.funcaoAPI.excluirNota(id)
    limpar()
    carregarNotas()
}

function adicionarAlterarNota(){
    if(modalIdNota.value != ''){
        alterarNota()
    }

    else{
        adicionarNota()
    }
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
    console.log(mostrarDetalhes)
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
    let listaMaterias = await window.funcaoAPI.buscarDisciplina()
    listaMaterias.forEach(mostrarDetalhesMateria)
    console.log(mostrarDetalhes)
}

carregarNotas();