function startPlayer() {
  const files = getSelectedFiles()
  if (!files){
    alert("Error: The selected folder does not contain an *.icf file. Please try again.")
    return
  }


  // Hide Splash Screen
  let splashScreen = document.getElementById('splashScreen')
  splashScreen.style.visibility = "hidden"

  // Show Player
  let playerContainer = document.getElementById('playerContainer')
  playerContainer.style.visibility = "visible"

  // Set background to black
  document.body.style.background = 'black'
}

function getSelectedFiles(){
  var fileList = document.getElementById('filePicker').files,
      jsonFile = false,
      icfFile = false,
      videoFile = false

  for(var i=0; i < fileList.length; i++){
    console.log(fileList[i]["name"].split(".")[1])
    var ext = fileList[i]["name"].split(".")[1]
    console.log("ext: " + ext)
    if (ext === "json")
      jsonFile = true
    else if (ext === "icf")
      icfFile = true
    else if (ext === "mp4" || ext === "m4v")  /*Add all supported file types*/
      videoFile = true
  }
  
  // if all the necessary files are included, return the fileList; else return FALSE
  return (jsonFile && icfFile && videoFile) ? fileList : false
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