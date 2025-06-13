const { ipcMain } = require('electron')

const {buscarProfessores, deletarProfessor, alterarProfessor, adicionarProfessor} = require ('./professor/professorDB')
const {buscarNota, deletarNota, alterarNota, adicionarNota} = require('./nota/notaDB')
const {buscarAlunos, deletarAluno, alterarAluno, adicionarAluno} = require ('./aluno/alunoDB')
const { modalAbrirProfessor, modalAbrirNota, modalAbrirAluno } = require('./janelaModal')

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
}

function registrarAlunoHandler(){
    ipcMain.handle('buscar-alunos', buscarAlunos)
    ipcMain.handle('deletar-alunos', deletarAluno)
    ipcMain.handle('alterar-aluno', alterarAluno)
    ipcMain.handle('adicionar-aluno', adicionarAluno)
}

function registrarJanelas(){
    ipcMain.on('abrir-professor', modalAbrirProfessor)
    ipcMain.on('abrir-nota', modalAbrirNota)
    ipcMain.on('abrir-aluno', modalAbrirAluno)
}

function registrarListerners(){
    registrarProfessorHandler()
    registrarNotaHandler()
    registrarAlunoHandler()
    registrarJanelas()
}
module.exports = {
    registrarListerners
}