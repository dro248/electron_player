var electron = require('electron')
var path = require('path')

// Keep a global reference of the window object so that it isn't garbage collected
var mainWindow = null


// This method will be called when Electron has finished
// initializing and is ready to create browser windows.
electron.app.on('ready', function () {  
	// Create the Splash Screen window
	mainWindow = new electron.BrowserWindow({
		width: 1000, 
		height: 780, 
		frame: false,
		icon: path.join(__dirname, 'filmstrip.png')
	})  
	mainWindow.loadURL('file://' + __dirname + '/player.html')  
})