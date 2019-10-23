const { remote, ipcRenderer } = require('electron')
const fs = require('fs')
const { player } = require('./player.js')

let annotationMode = false;

Events.addListener(window, 'resize', () => {
  player.draw_box()
})

// TODO: Add listener for when window is ready to click filePicker
/*Events.addListener(window, 'DOMContentLoaded', () => {
  document.getElementById('filePicker').click()
})*/

const toggleDevTools = () => {
  ipcRenderer.send('toggle-dev-tools', 'request')
}

ipcRenderer.on('response-cmd-argv', (event, argv) => {
  if(argv[2] == 'annotate' || argv[2] == 'a' || argv[2] == '-a') {
    player.toggleAnnotationMode()
  }
})
ipcRenderer.send('request-cmd-argv', 'request')
