const coordsX = [0,"a","b","c","d","e","f","g","h","i","j"]
const coordsY = [0,1,2,3,4,5,6,7,8,9,10]
let availableLengths = {5:1,3:3,4:1,2:2,1:1}
let board = [
  'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 
  'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 
  'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 
  'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 
  'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10', 
  'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10'
]
let availableSquares = [...board]
let shipPositions = []
const startButton = document.getElementById("startButton")
startButton.addEventListener("click",()=>{
  for(let i = 1; i <= 8; i++) createShip(i)  
})
function getRowShipNum(row,type){
  let counter = 0 
  for(let i = 1; i <= 10; i++) counter += type == "row" ? board[row][i] : type == "column" ? board[i][row] : 0
  return counter
}
function getRandomNum(max,min){
  return parseInt(Math.random() * ((max + 1) - min) + min)
}
let inside = (startcoord,secondcoord) =>{
  return startcoord + secondcoord <= 10 && startcoord + secondcoord >= 1 ? true : false
}
function findneighbors(x,y){
  let coords = [[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0]]
  let neighbors = []
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
function getShipPosition(x,y,length){
  let shipPosition = []
  let cases = [length,-length,0]
  let offsetX = cases[getRandomNum(-1,3)]
  let offsetY = offsetX == 0 ? cases[getRandomNum(-1,2)] : 0
  let [stable,moving] = offsetX == 0 ? [[offsetX,x],[offsetY,y]] : [[offsetY,y],[offsetX,x]]
  moving = !inside(moving[1],moving[0]) ? [-moving[0],moving[1]] : moving
  let [i,increment] = moving[0] < 0 ? [moving[1],-1] : [moving[1],1]
  let target = moving[1] + moving[0] + increment + 2 * increment * (-1)
  if(target < 1 || target > 10) return shipPosition
  let condition = true
  let checkSquare = (square) =>{
    if(availableSquares.includes(square)) return [square]
    return []
  }
  for(let j = i; condition; j+= increment){
    shipPosition = offsetX == 0 ? shipPosition.concat(checkSquare(coordsX[x]+coordsY[j])) : shipPosition.concat(checkSquare(coordsX[j]+coordsY[y]))
    condition = moving[0] < 0 ? j > target : j < target    
  }
  return shipPosition
}
function removeSquares(shipSquares){
  shipSquares.forEach(shipsquare =>{
    let [x,y] = [coordsX.indexOf(shipsquare[0]),parseInt(shipsquare[1])];     
    let squares = findneighbors(x,y)
    if(availableSquares.includes(shipsquare)) availableSquares.splice(availableSquares.indexOf(shipsquare),1)
    squares.forEach(square => {if(availableSquares.includes(square)) availableSquares.splice(availableSquares.indexOf(square),1)}) 
  })
}
function createShip(num){  
  let shipLength = 0
  let shipPosition = []
  do{
    shipLength = createShipLength()   
    let startSquare = availableSquares[getRandomNum(availableSquares.length-1,0)]
    let [x,y] = [coordsX.indexOf(startSquare[0]),parseInt(startSquare[1])]; 
    shipPosition = getShipPosition(x,y,shipLength) 
    console.log("Wrong ship position!")
  }while(shipLength != shipPosition.length)
  removeSquares(shipPosition)
  removeShip(shipLength)
  shipPositions.push(...shipPosition)
  ////////////////////////////
  shipPosition.forEach(pos =>{
    if(pos){
  document.getElementById(pos).style.backgroundColor = "red"  
  document.getElementById(pos).innerText = num
    }
  }) 
  if(num == 8){
    availableSquares.forEach(el =>{
      document.getElementById(el).style.backgroundColor = "green" 
    })
  }
  ///////////////////////////
}
//Να φτιαξω να μην μπορει ο χρηστης να ξαναπατησει το ιδιο κουμπι, 
//Nα φταξω μονο οταν ο χρηστης πατησει το κουμπι τοτε να μπαινουν τα event listeners
//Να φτιαξω το προβλημα με την απειρη λουπα στο do while
let audioStatus = "off";
const allButtons = document.querySelectorAll('div[class^=square]');
let muteunmutetxt =  document.getElementById("volume");
const squareSound = new Audio("sounds/pwlpl-horses-galloping-sound-effect-359257.mp3");
let mutebtn = document.getElementById("muteunmute-btn")
mutebtn.addEventListener("click",()=>{
  audioStatus = audioStatus == "off" ? "up" : "off";
  muteunmutetxt.classList.replace(muteunmutetxt.classList[1],`fa-volume-${audioStatus}`) 
});
allButtons.forEach((button) => {  
  button.addEventListener('click', e =>{
    let color = shipPositions.includes(e.target.id) ? "green" : "red"
    e.target.style.backgroundColor = color
    audioStatus == "up" ? squareSound.play() : false;
  });
})






