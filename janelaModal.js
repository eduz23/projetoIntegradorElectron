const { BrowserWindow } = require('electron')
const path = require('path')
const { getMainWindow } = require('./janelaPrincipal')

function criarJanelaModal(telaPai, arquivohtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,

        modal: true,
        parent: telaPai,


        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        
    })

    janela.loadFile(arquivohtml)

    return janela;
}

function modalAbrirProfessor(event) {
    let mainWindow = getMainWindow()
    if (mainWindow) {
        criarJanelaModal(mainWindow, "./src/professor/professor.html")
    } else {
        console.log("Não foi possível abrir o modal: Janela principal ta paia")
    }
}

function modalAbrirAluno(event) {
    let mainWindow = getMainWindow()
    if (mainWindow) {
        criarJanelaModal(mainWindow, "./src/aluno/aluno.html")
    } else {
        console.log("Não foi possível abrir o modal: Janela principal ta paia")
    }
}

function modalAbrirDisciplina(event){
    let mainWindow = getMainWindow()
    if(mainWindow){
        criarJanelaModal(mainWindow, "./src/disciplina/disciplina.html")
    }
    else{
        console.log('erro')
    }
}

function modalAbrirNota(event){
    let mainWindow = getMainWindow()
    if(mainWindow){
        criarJanelaModal(mainWindow, "./src/nota/nota.html")
    }
    else{
        console.log('erro')
    }
}

function modalAbrirMateria(event){
    let mainWindow = getMainWindow()
    if(mainWindow){
        criarJanelaModal(mainWindow, "./src/materia/materia.html")
    }
    else{
        console.log('erro')
    }
}


module.exports = {
    criarJanelaModal,
    modalAbrirProfessor,
    modalAbrirNota,
    modalAbrirAluno,
    modalAbrirDisciplina
}