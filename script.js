var player = {
  video_obj: document.getElementById('player'),
  
  start_player: () => { 
    const files = player.get_selected_files()
    if (!files){
      alert("Error: The selected folder does not contain an *.icf file. Please try again.")
      return
    }
    // Hide Splash Screen
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.style.visibility = "hidden"

    // Set video src to given file
    let videoPath = files['videoFile']['path']
    player.video_obj.src = videoPath


    // Show Player
    let playerContainer = document.getElementById('playerContainer')
    playerContainer.style.visibility = "visible"

    // Set background to black
    document.body.style.background = 'black'

    // Play the video
    player.video_obj.play()

    // Create time update listener to handle annotations
    player.video_obj.addEventListener("timeupdate", (event) => {
      // timeStamp is in milliseconds
      console.log(event.timeStamp)

      // TODO: handle events
    })
  },

  hide_player: () => {
    // Show Splash Screen
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.style.visibility = "visible"

    // Hide Player
    let playerContainer = document.getElementById('playerContainer')
    playerContainer.style.visibility = "hidden"

    // Pause the video
    player.video_obj.pause()

    // Set background to normal
    document.body.style.background = 'linear-gradient(to right, #070000, #4C0001, #070000)'
  },

  get_selected_files: () => {
    var fileList = document.getElementById('filePicker').files,
        jsonFile = null,
        icfFile = null,
        videoFile = null,
        jsonFileExists = false,
        icfFileExists = false,
        videoFileExists = false

    for(var i=0; i < fileList.length; i++){
      console.log(fileList[i]["name"].split(".")[1])
      var ext = fileList[i]["name"].split(".")[1]
      console.log("ext: " + ext)
      if (ext === "json"){
        jsonFileExists = true
        jsonFile = fileList[i]
      }
      else if (ext === "icf"){
        icfFileExists = true
        icfFile = fileList[i]
      }
      else if (ext === "mp4" || ext === "m4v")  /*TODO: Add all supported file types*/
        videoFileExists = true
        videoFile = fileList[i]
    }
    
    // if all the necessary files are included, return the fileList; else return FALSE
    return (jsonFile && icfFile && videoFile) 
      ? {'jsonFile': jsonFile, 'icfFile': icfFile, 'videoFile': videoFile} 
      : false
  },

  // Annotation Handlers

  play: () => { player.video_obj.play() },
  pause: () => { player.video_obj.pause() },
  skip_to: (time) => {},
  
  blank: () => { player.video_obj.style = "filter: brightness(0)" },
  unblank: () => { player.video_obj.style = "filter: brightness(1)" },
  
  blur: (val) => { player.video_obj.style = `filter: blur(${val}px)`},
  unblur: () => { player.video_obj.style = "filter: blur(0)" },
  
  toggle_mute: () => { player.video_obj.muted =  !player.video_obj.muted }
}
