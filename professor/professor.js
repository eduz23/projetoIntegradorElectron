
const tabelaProfessor = document.getElementById('professoresTableDados');

const modalNomeProfessor = document.getElementById('professor-nome');
const modalDisciplinaProfessor = document.getElementById('professor-disciplina');
const modalTelefoneProfessor = document.getElementById('professor-telefone')
const modalIDProfessor = document.getElementById('professor-id');

const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adicionarAlterarProfessor)

//botao excluir
botaoExcluir.addEventListener('click', excluirProfessor)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(id, nome, disciplina, telefone) {
    
    modalIDProfessor.value = id;
    modalNomeProfessor.value = nome;
    modalDisciplinaProfessor.value = disciplina;
    modalTelefoneProfessor.value = telefone;
}

function limpar(){
    modalIDProfessor.value = ""
    modalNomeProfessor.value = ""
    modalDisciplinaProfessor.value = ""
    modalTelefoneProfessor.value = ""
}



function adicionarAlterarProfessor(){
    if(modalIDProfessor.value != ''){
        alterarProfessor()
    }
    else{
        adicionarProfessor()
    }
}

async function alterarProfessor() {
    await window.funcaoAPI.alterarProfessor(modalIDProfessor.value, modalNomeProfessor.value, modalDisciplinaProfessor.value, modalTelefoneProfessor.value)
    carregarProfessores()
    modalIDProfessor.value = ""
    modalNomeProfessor.value = ""
    modalDisciplinaProfessor.value = ""
    modalTelefoneProfessor.value = ""
}


async function adicionarProfessor(){
    await window.funcaoAPI.adicionarProfessor(modalNomeProfessor.value, modalDisciplinaProfessor.value, modalTelefoneProfessor.value)
    carregarProfessores()
    limpar()
}
 

async function excluirProfessor() {
    const id = modalIDProfessor.value;

    await window.funcaoAPI.excluirProfessor(id);

    //após deleção atualiza a lista de alunos
    carregarProfessores();

    modalIDProfessor.value = ""
    modalNomeProfessor.value = ""
    modalDisciplinaProfessor.value = ""
    modalTelefoneProfessor.value = ""
}


async function carregarProfessores() {


    const listaProfessor = await window.funcaoAPI.buscarProfessores();
    tabelaProfessor.innerHTML = "";

    console.log(listaProfessor)
    listaProfessor.forEach(criarLinhaProfessor)

    if (!listaProfessor.length > 0) {

        tabelaProfessor.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaProfessor(professor) {

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = professor.nome;
    linha.appendChild(celulaNome);

    //disciplina
    const celulaDisciplina = document.createElement("td");
    celulaDisciplina.textContent = professor.disciplina;
    linha.appendChild(celulaDisciplina);

    //telefone
    const celulaTelefone = document.createElement("td")
    celulaTelefone.textContent = professor.telefone
    linha.appendChild(celulaTelefone)

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(professor.id, professor.nome, professor.disciplina, professor.telefone) }
    );

    botao.textContent = '';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);


    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    tabelaProfessor.appendChild(linha);

}




carregarProfessores()