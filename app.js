const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const argv = process.argv;
var mainWindow = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
		height: 780,
		frame: true,
		icon: path.join(__dirname, '/resources/filmstrip.png'),
    webPreferences: {
      //experimentalFeatures: true,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/renderer/player.html')

  /*if(argv[2] == 'annotate' || argv[2] == 'a' || argv[2] == '-a') {
    mainWindow.webContents.openDevTools()
  }*/
}

app.on('ready', createWindow)

ipcMain.on('request-cmd-argv', (event, arg) => {
  event.reply('response-cmd-argv', argv)
})

ipcMain.on('toggle-dev-tools', (event, arg) => {
  //if(mainWindow.webContents.isDevToolsOpened())
  // TODO: This doesn't always work. If the user manually closes the dev tools,
  // it just toggles it like normal,
  //so it could pop up once the user exits annotation mode
  mainWindow.webContents.toggleDevTools()
})
