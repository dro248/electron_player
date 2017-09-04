function startPlayer() {
  const files = getSelectedFiles()
  if (!files){
    alert("Error: The selected folder does not contain an *.icf file. Please try again.")
    return
  }
  // Hide Splash Screen
  let splashScreen = document.getElementById('splashScreen')
  splashScreen.style.visibility = "hidden"

  // Set video src to given file
  let player = document.getElementById('player')
  let videoPath = files['videoFile']['path']
  player.src = videoPath

  // Show Player
  let playerContainer = document.getElementById('playerContainer')
  playerContainer.style.visibility = "visible"

  // Set background to black
  document.body.style.background = 'black'

  // Play the video
  player.play()
}

function getSelectedFiles(){
  var fileList = document.getElementById('filePicker').files,
      jsonFileExists = false,
      jsonFile = null,
      icfFileExists = false,
      icfFile = null,
      videoFileExists = false,
      videoFile = null

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
}

function hidePlayer() {
  // Show Splash Screen
  let splashScreen = document.getElementById('splashScreen')
  splashScreen.style.visibility = "visible"

  // Hide Player
  let playerContainer = document.getElementById('playerContainer')
  playerContainer.style.visibility = "hidden"

  // Set background to normal
  document.body.style.background = 'linear-gradient(to right, #070000, #4C0001, #070000)'
}