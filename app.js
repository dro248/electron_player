var electron = require('electron')  

// Keep a global reference of the window object so that it isn't garbage collected
var mainWindow = null


// This method will be called when Electron has finished
// initializing and is ready to create browser windows.
electron.app.on('ready', function () {  
	// Create the Splash Screen window
	mainWindow = new electron.BrowserWindow({width: 1200, height: 800, frame: true})  
	mainWindow.loadURL('file://' + __dirname + '/splashScreen.html')  
})