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

// Funções de disciplina

function buscarDisciplinas() {
    return ipcRenderer.invoke('buscar-disciplinas')
}

function excluirDisciplina(id) {
    return ipcRenderer.invoke('deletar-disciplina', id)
}

function alterarDisciplina(id, id_professor, nome) {
    return ipcRenderer.invoke('alterar-disciplina', id, id_professor, nome)
}

function adicionarDisciplina(nome, id_professor) {
    return ipcRenderer.invoke('adicionar-disciplina', nome, id_professor)
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

function filtrarNota(filtro){
    return ipcRenderer.invoke('filtrar-nota', filtro)
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

function filtrarAluno(filtro){
    return ipcRenderer.invoke('filtrar-aluno', filtro)
}

// Funções de login

function validarLogin(nome, sennha){
    return ipcRenderer.invoke('validar-login', nome, sennha)
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
        filtrarNota:filtrarNota,

        buscarAlunos:buscarAlunos,
        excluirAluno:excluirAluno,
        alterarAluno:alterarAluno,
        adicionarAluno:adicionarAluno,
        filtrarAluno:filtrarAluno,

        buscarDisciplinas:buscarDisciplinas,
        excluirDisciplina:excluirDisciplina,
        alterarDisciplina:alterarDisciplina,
        adicionarDisciplina:adicionarDisciplina,
        
        validarLogin: validarLogin
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

function abrirDisciplina(){
    ipcRenderer.send('abrir-disciplina')
}

function abrirJanelaPrincipal(){
    ipcRenderer.send('abrir-JanelaPrincipal')
}

function abrirJanelaAluno(){
    ipcRenderer.send('abrir-janelaAluno')
}

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirProfessor:abrirProfessor,
        abrirNota:abrirNota,
        abrirAluno:abrirAluno,
        abrirDisciplina:abrirDisciplina,
        abrirJanelaPrincipal: abrirJanelaPrincipal,
        abrirJanelaAluno: abrirJanelaAluno
    }
)