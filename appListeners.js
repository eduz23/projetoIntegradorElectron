const { ipcMain } = require('electron')

// Importar funções dos arquivos banco de dados que possuem a query
const {buscarProfessores, deletarProfessor, alterarProfessor, adicionarProfessor} = require ('./professor/professorDB')
const {buscarNota, deletarNota, alterarNota, adicionarNota, filtrarNota} = require('./nota/notaDB')
const {buscarAlunos, deletarAluno, alterarAluno, adicionarAluno, filtrarAluno} = require ('./aluno/alunoDB')
const {buscarDisciplinas, deletarDisciplina, alterarDisciplina, adicionarDisciplina} = require('./disciplina/disciplinaDB')
const {validarLogin} = require('./login/loginDB')
const { modalAbrirProfessor, modalAbrirNota, modalAbrirAluno, modalAbrirDisciplina } = require('./janelaModal')
const { createMainWindow, createMainWindowUser } = require('./janelaPrincipal')

// Dar uma chamada as funções
function registrarProfessorHandler(){
    ipcMain.handle('buscar-professores', buscarProfessores)
    ipcMain.handle('deletar-professor', deletarProfessor)
    ipcMain.handle('alterar-professor', alterarProfessor)
    ipcMain.handle('adicionar-professor', adicionarProfessor)
}

function registrarNotaHandler(){
    ipcMain.handle('buscar-notas', buscarNota)
    ipcMain.handle('deletar-nota', deletarNota)
    ipcMain.handle('alterar-nota', alterarNota)
    ipcMain.handle('adicionar-nota', adicionarNota)
    ipcMain.handle('filtrar-nota', filtrarNota)
}

function registrarAlunoHandler(){
    ipcMain.handle('buscar-alunos', buscarAlunos)
    ipcMain.handle('deletar-alunos', deletarAluno)
    ipcMain.handle('alterar-aluno', alterarAluno)
    ipcMain.handle('adicionar-aluno', adicionarAluno)
    ipcMain.handle('filtrar-aluno', filtrarAluno)
}

function registrarDisciplinaHandler(){
    ipcMain.handle('buscar-disciplinas', buscarDisciplinas)
    ipcMain.handle('deletar-disciplina', deletarDisciplina)
    ipcMain.handle('alterar-disciplina', alterarDisciplina)
    ipcMain.handle('adicionar-disciplina', adicionarDisciplina)
}

function registrarLoginHandler(){
    ipcMain.handle('validar-login', validarLogin)
}

function registrarJanelas(){
    ipcMain.on('abrir-professor', modalAbrirProfessor)
    ipcMain.on('abrir-nota', modalAbrirNota)
    ipcMain.on('abrir-aluno', modalAbrirAluno)
    ipcMain.on('abrir-disciplina', modalAbrirDisciplina)
    ipcMain.on('abrir-JanelaPrincipal', createMainWindow)
    ipcMain.on('abrir-janelaAluno', createMainWindowUser)
}

function registrarListerners(){
    registrarProfessorHandler()
    registrarNotaHandler()
    registrarAlunoHandler()
    registrarDisciplinaHandler()
    registrarLoginHandler()
    registrarJanelas()
}
module.exports = {
    registrarListerners
}