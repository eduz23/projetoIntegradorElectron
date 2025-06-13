const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome');
const modalAlunoIdade = document.getElementById('aluno-idade');
const modalAlunoCpf = document.getElementById('aluno-cpf')
const modalIDAluno = document.getElementById('aluno-id');

const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adicionarAlterarAluno)

//botao excluir
botaoExcluir.addEventListener('click', excluirAluno)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(id, nome, idade, cpf) {
    modalIDAluno.value = id;
    modalNomeAluno.value = nome
    modalAlunoIdade.value = idade
    modalAlunoCpf.value = cpf
}

function limpar(){
    modalIDAluno.value = ""
    modalNomeAluno.value = ""
    modalAlunoIdade.value = ""
    modalAlunoCpf.value = ""

}



function adicionarAlterarAluno(){
    if(modalIDAluno.value != ''){
        alterarAluno()
    }
    else{
        adicionarAluno()
    }
}

async function alterarAluno() {
    await window.funcaoAPI.alterarAluno(modalIDAluno.value, modalNomeAluno.value, modalAlunoIdade.value, modalAlunoCpf.value)
    carregarAlunos()
    limpar()
}


async function adicionarAluno(){
    await window.funcaoAPI.adicionarAluno(modalNomeAluno.value, modalAlunoIdade.value, modalAlunoCpf.value)
    carregarAlunos()
    limpar()
}
 

async function excluirAluno() {
    const id = modalIDAluno.value;

    await window.funcaoAPI.excluirAluno(id);

    //após deleção atualiza a lista de alunos
    carregarAlunos();
    limpar()
}


async function carregarAlunos() {


    const listaAlunos = await window.funcaoAPI.buscarAlunos();
    tabelaAluno.innerHTML = "";

    console.log(listaAlunos)
    listaAlunos.forEach(criarLinhaAluno)

    if (!listaAlunos.length > 0) {

        tabelaAluno.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaAluno(aluno) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = aluno.nome;
    linha.appendChild(celulaNome);

    //idade
    const celulaIdade = document.createElement("td");
    celulaIdade.textContent = aluno.idade;
    linha.appendChild(celulaIdade);

    //cpf
    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = aluno.cpf
    linha.appendChild(celulaCpf)

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(aluno.nome, aluno.idade, aluno.cpf, aluno.id) }
    );
    botao.textContent = '';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaAluno.appendChild(linha);

}




carregarAlunos()