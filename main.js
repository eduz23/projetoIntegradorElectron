const { app, BrowserWindow } = require('electron');
const path = require('path');
const { createLoginWindow } = require('./src/janelaPrincipal');
const { registrarListerners } = require('./src/appListeners');


app.whenReady().then(function () {

    createLoginWindow();
    registrarListerners();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createLoginWindow();
        }
    });

}
);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});