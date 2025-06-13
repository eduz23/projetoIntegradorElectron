const { contextBridge, ipcRenderer } = require('electron')

// Funções de professor

function buscarProfessores(){
    return ipcRenderer.invoke('buscar-professores')
}

function excluirProfessor(id){
    return ipcRenderer.invoke('deletar-professor', id)
}

function alterarProfessor(id, nome, disciplina, telefone){
    return ipcRenderer.invoke('alterar-professor', id, nome, disciplina, telefone)
}

function adicionarProfessor(nome, disciplina, telefone){
    return ipcRenderer.invoke('adicionar-professor', nome, disciplina, telefone)
}

// Funções de nota

function buscarNota(){
    return ipcRenderer.invoke('buscar-notas')
}

function excluirNota(id){
    return ipcRenderer.invoke('deletar-nota', id)
}

function alterarNota(id, id_aluno, id_disciplina, nota){
    return ipcRenderer.invoke('alterar-nota', id, id_aluno, id_disciplina, nota)
}

function adicionarNota(id_aluno, id_disciplina, nota){
    return ipcRenderer.invoke('adicionar-nota', id_aluno, id_disciplina, nota)
}

// Funções para aluno

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAluno(id) {
    return ipcRenderer.invoke('deletar-alunos', id);
}

function alterarAluno(id, nome, idade, cpf) {
    return ipcRenderer.invoke('alterar-aluno', id, nome, idade, cpf);
}

function adicionarAluno(nome, idade, cpf) {
    return ipcRenderer.invoke('adicionar-aluno', nome, idade, cpf)
}

contextBridge.exposeInMainWorld('funcaoAPI',
    
    {
        buscarProfessores:buscarProfessores,
        excluirProfessor:excluirProfessor,
        alterarProfessor:alterarProfessor,
        adicionarProfessor:adicionarProfessor,

        buscarNota:buscarNota,
        excluirNota:excluirNota,
        alterarNota:alterarNota,
        adicionarNota:adicionarNota,

        buscarAlunos:buscarAlunos,
        excluirAluno:excluirAluno,
        alterarAluno:alterarAluno,
        adicionarAluno:adicionarAluno
    }
)

function abrirProfessor(){
    ipcRenderer.send('abrir-professor')
}

function abrirNota(){
    ipcRenderer.send('abrir-nota')
}

function abrirAluno(){
    ipcRenderer.send('abrir-aluno')
}

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirProfessor:abrirProfessor,
        abrirNota:abrirNota,
        abrirAluno:abrirAluno
    }
)