const tabelaDisciplina = document.getElementById('disciplinaTableDados');
const modalNomeDisciplina = document.getElementById('disciplina-nome');
const modalProfessorDisciplina = document.getElementById('disciplina-professor');
const modalIdDisciplina = document.getElementById('disciplina-id');

const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adicionarAlterarDisciplina)

//botao excluir
botaoExcluir.addEventListener('click', excluirDisciplina)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(id, nome, id_professor) {
    modalIdDisciplina.value = id;
    modalProfessorDisciplina.value = id_professor;
    modalNomeDisciplina.value = nome
}

function limpar(){
    modalIdDisciplina.value = ""
    modalNomeDisciplina.value = ""
    modalProfessorDisciplina.value = ""
}



function adicionarAlterarDisciplina(){
    if(modalIdDisciplina.value != ''){
        alterarDisciplina()
    }
    else{
        adicionarDisciplina()
    }
}

async function alterarDisciplina() {
    await window.funcaoAPI.alterarDisciplina(modalIdDisciplina.value, modalProfessorDisciplina.value, modalNomeDisciplina.value)
    carregarDisciplinas()
    limpar()
}


async function adicionarDisciplina(){
    await window.funcaoAPI.adicionarDisciplina(modalNomeDisciplina.value, modalProfessorDisciplina.value)
    carregarDisciplinas()
    limpar()
}
 

async function excluirDisciplina() {
    const id = modalIdDisciplina.value;

    await window.funcaoAPI.excluirDisciplina(id);

    //após deleção atualiza a lista de disciplinas
    carregarDisciplinas();
    limpar()
}


async function carregarDisciplinas() {


    const listaDisciplinas = await window.funcaoAPI.buscarDisciplinas();
    tabelaDisciplina.innerHTML = "";

    listaDisciplinas.forEach(criarLinhaDisciplina);

    if (!listaDisciplinas.length > 0) {

        tabelaDisciplina.textContent = "sem dados"
    }

    carregarSelectProfessor();
    lucide.createIcons(); 

    let tipoUser = localStorage.getItem('perfil')

    if(tipoUser !== 'adm'){
        botaoAlterar.disabled = true
        botaoExcluir.disabled = true
    }
}

function criarLinhaDisciplina(disciplina) {

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = disciplina.nome;
    linha.appendChild(celulaNome);

    //professor
    const celulaProf = document.createElement("td");
    celulaProf.textContent = disciplina.professor;
    linha.appendChild(celulaProf)

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(disciplina.id, disciplina.nome, disciplina.id_professor)}
    );

    botao.textContent = '';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com nome, professor e botao à tabela
    tabelaDisciplina.appendChild(linha);

}

function selectProfessor(professor){
    let option = document.createElement("option");

    option.value = professor.id
    option.textContent = professor.nome;
    modalProfessorDisciplina.appendChild(option);
}

async function carregarSelectProfessor(){
    modalProfessorDisciplina.innerHTML = ""
    let listaProf = await window.funcaoAPI.buscarProfessores();
    listaProf.forEach(selectProfessor);
}

carregarDisciplinas()