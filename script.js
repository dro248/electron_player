var player = {
  video_obj: document.getElementById('player'),
  annotations: null,
  
  start_player: () => { 
    const files = player.get_selected_files()
    if (!files){
      alert("Error: The selected folder does not contain an *.icf file. Please try again.")
      return
    }

    var initialise = () => {
      console.log("initialising")
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
  
      console.log(player.annotations)

      player.video_obj.addEventListener("loadedmetadata", ()=> {
        // Draw box initially
        player.draw_box() 
      })
    }
    // Instantiate object variable 'annotations'
    player.parse_n_play(files['jsonFile'], initialise)

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
      var ext = fileList[i]["name"].split(".")[1]
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

  parse_n_play: (jsonFile, initialise_callback) => {
    var jsonReader = new FileReader();
    jsonReader.onload = function(){
      var text = jsonReader.result
      player.annotations = []
      var jsonGuts = JSON.parse(text)[0]["media"][0]["tracks"][0]["trackEvents"]
      for (var i = 0; i < jsonGuts.length; i++) {
        var annotation = {"start": jsonGuts[i].popcornOptions['start'], 
                          "end": jsonGuts[i].popcornOptions['end'],
                          "type": jsonGuts[i]['type']
                         }
        player.annotations.push(annotation)
      }
      player.annotate()
      initialise_callback()
    }
    jsonReader.readAsText(jsonFile)
  },

  annotate: () => {
    console.log("in the annotate function")
    player.video_obj.addEventListener("playing", (event) => {
      var vidPlaying = setInterval(() => {
        if (player.video_obj.paused) {
          clearInterval(vidPlaying)
        }
        
        var time = player.video_obj.currentTime
        var numAnnotations = player.annotations.length
        for (var i = 0; i < numAnnotations; i++) {
          var vMuted = player.video_obj.muted
          var vBlanked = player.video_obj.classList.contains('blanked')
          
          var a = player.annotations[i]
          var aStart = a['start']
          var aEnd = a['end']
          var aType = a['type']
          
          switch (a['type']) {
            case 'skip':
              if (time >= aStart && time < aEnd) {
                console.log('skipped to '+Number(aEnd).toFixed(3))
                clearInterval(vidPlaying)
                player.skip_to(aEnd)
                player.play()
              }
              break
            case 'mutePlugin':
              if (time >= aStart && time < aEnd) {
                if (!vMuted) {
                  console.log('mute on')
                  player.mute()
                }
              } else {
                if (vMuted) {
                  console.log('mute off')
                  player.unmute()
                }
              }
              break
            case 'blank':
              if (time >= aStart && time < aEnd) {
                if (!vBlanked) {
                  console.log('blank on')
                  player.blank()
                }
              } else {
                if (vBlanked) {
                  console.log('blank off')
                  player.unblank()
                }
              }
              break
          }
        }
      }, 16)
    })
  },

  // Annotation Handlers

  play: () => { player.video_obj.play() },
  pause: () => { player.video_obj.pause() },
  skip_to: (time) => { player.video_obj.currentTime = time },
  
  blank: () => { player.video_obj.classList.add('blanked') },
  unblank: () => { player.video_obj.classList.remove('blanked') },
  
  blur: (val) => { player.video_obj.style = `filter: blur(${val}px)`},
  unblur: () => { player.video_obj.style = "filter: blur(0)" },
  
  mute: () => { player.video_obj.muted =  true },
  unmute: () => { player.video_obj.muted = false }

}






window.addEventListener("resize", () => {
  player.draw_box()
})
