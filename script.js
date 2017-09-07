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
      // console.log(event.timeStamp)

      // TODO: handle events
    })


    player.video_obj.addEventListener("loadedmetadata", ()=> {
      // Draw box initially
      player.draw_box() 
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

  get_video_dimensions: () => {
    var video = player.video_obj

    // Ratio of the video's intrisic dimensions
    var videoRatio = video.videoWidth / video.videoHeight;
    
    // The width and height of the video element
    var width = video.offsetWidth 
    var height = video.offsetHeight

    // The ratio of the element's width to its height
    var elementRatio = width/height;
    
    // If the video element is short and wide
    if(elementRatio > videoRatio) width = height * videoRatio;
    
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
      width: width,
      height: height
    };
  },


  draw_box: () => {
    var videoDimensions = player.get_video_dimensions()
    var vidHeight = videoDimensions.height
    var vidWidth = videoDimensions.width

    // Get window Height
    var winHeight = window.innerHeight
    var winWidth = window.innerWidth

    var boxTop = 0
    var boxLeft = 0
    if(winHeight > vidHeight)
      boxTop = (winHeight - vidHeight) / 2
    else
      boxLeft = (winWidth - vidWidth) / 2

    var box = document.getElementById('test')

    box.style.top = `${boxTop}px`
    box.style.left = `${boxLeft}px`

    box.style.height = `${vidHeight}px`
    box.style.width = `${vidWidth}px`
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






window.addEventListener("resize", () => {
  player.draw_box()
})
