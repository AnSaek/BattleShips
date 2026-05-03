const coordsX = [0,"a","b","c","d","e","f","g","h","i","j"]
const coordsY = [0,1,2,3,4,5,6,7,8,9,10]
let availableLengths = {5:1,3:3,4:1,2:2,1:1}
let unavailableSquares = []
let ships = []

const starButton = document.getElementById("startButton")

starButton.addEventListener("click",()=>{
    for(let i = 1; i <= 8; i++){
      createShip()  
    } 
})

function getRandomNum(max,min){
   return parseInt(Math.random() * ((max + 1) - min) + min)
}

function findneighbors(x,y){
  let coords = [[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0]]
  let neighbors = []
  let inside = (startcoord,secondcoord) =>{
   return startcoord + secondcoord <= 10 && startcoord + secondcoord >= 1 ? true : false
  }
  for(let i = 0; i < coords.length; i++){
    let isInsideBoarderX = inside(x,coords[i][0])
    let isInsideBoarderY = inside(y,coords[i][1])
    let neighbor = coordsX[x+coords[i][0]]+coordsY[y+coords[i][1]]
    if(!isInsideBoarderX || !isInsideBoarderY) continue
    neighbors.push(neighbor)
  }
  return neighbors
}
let createShipLength = () =>{
    let isAvail;
    do{  
        let length = getRandomNum(5,1)
        isAvail = availableLengths[length] >= 1 ? true : false
        if(isAvail) return length 
    }while(!isAvail)    
}
let removeShip = (shipLength) =>{
    availableLengths[shipLength]--     
}
function createShip(){
  let shipPosition = []
  let shipLength = 0
  shipLength = createShipLength()
  removeShip(shipLength)
}