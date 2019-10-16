const { remote, ipcRenderer } = require('electron')
const fs = require('fs')
const { player } = require('./player.js')

let annotateMode = false;

Events.addListener(window, "resize", () => {
  player.draw_box()
})

ipcRenderer.on('response-cmd-argv', (event, argv) => {
  if(argv[2] == 'annotate' || argv[2] == 'a' || argv[2] == '-a') {
    // Called while creating the annotations: player.enter_annotation_mode()
    annotateMode = true;
  }
})
ipcRenderer.send('request-cmd-argv', 'request')
