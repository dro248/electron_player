var electron = require('electron')  
       
electron.app.on('ready', function () {  
	var mainWindow = new electron.BrowserWindow({width: 1200, height: 800})  
	mainWindow.loadURL('file://' + __dirname + '/splashScreen.html')  
})