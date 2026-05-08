const coordsX = [0,"a","b","c","d","e","f","g","h","i","j"]
const coordsY = [0,1,2,3,4,5,6,7,8,9,10]
let availableLengths = {5:1,3:3,4:1,2:2,1:1}
let board = [0,
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,1,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0]
]
const starButton = document.getElementById("startButton")
starButton.addEventListener("click",()=>{
  for(let i = 1; i <= 8; i++){
    createShip()  
  } 
})
function getRowShipNum(row,type){
  let counter = 0 
  for(let i = 1; i <= 10; i++) counter += type == "row" ? board[row][i] : type == "column" ? board[i][row] : 0
  return counter
}
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
  let shipsLengths = Object.keys(availableLengths) 
  let index = getRandomNum(shipsLengths.length-1,0)
  return shipsLengths[index]
}
let removeShip = (shipLength) =>{
  availableLengths[shipLength]--
  if(availableLengths[shipLength] == 0) delete availableLengths[shipLength]     
}
function setShipPosition(x,y,length){
  let shipPosition = []
  let cases = [length,-length,0]
  let offsetX = cases[getRandomNum(-1,3)]
  let offsetY = offsetX == 0 ? cases[getRandomNum(-1,2)] : 0
  let [stable,moving] = offsetX == 0 ? [offsetX,[offsetY,y]] : [offsetY,[offsetX,x]]
  let target = moving[1] + moving[0]
  let [i,increment] = moving[0] > 0 ? [moving[1],-1] : [moving[1],1]
  console.log(i,increment,target)
  //Να ελενξω εαν ειναι εντος του board το target
  // for(let j = i; condition; j+= increment){

  // }
  // console.log(stable,moving)
}
function createShip(){  
  let shipLength = createShipLength() 
  console.log(shipLength)
  console.log(availableLengths)
  removeShip(shipLength)
}