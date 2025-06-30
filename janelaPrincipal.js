const { BrowserWindow } = require('electron')
const path = require('path')

let janelaPrincipal;
let janelaLogin;
let janelaAluno;

function createMainWindowUser() {
     janelaAluno = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    janelaAluno.loadFile('./src/aluno/aluno.html');

    janelaLogin.close()

    janelaAluno.on('closed', () => {
        janelaAluno = null;
    });

    return janelaAluno
}

function createMainWindow() {
     janelaPrincipal = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            autoHideMenuBar: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    janelaPrincipal.loadFile('./src/index.html');

    janelaLogin.close()

    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null;
    });

    return janelaPrincipal
}

function getMainWindow() {
    return janelaPrincipal;
}


function createLoginWindow(){
    janelaLogin = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload : path.join(__dirname, 'preload.js'),
        }
    })

    janelaLogin.loadFile('./src/login/login.html')
}

function getJanelaLogin(){
    return janelaLogin
}

module.exports = {
    createMainWindow,
    createMainWindowUser,
    getMainWindow,
    createLoginWindow
}