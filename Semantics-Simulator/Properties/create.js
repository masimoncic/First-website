//set up variables for properties
let squareP = '{';
let rectangleP = '{';
let circleP = '{';






//pick random values

//pick random shape
function randShape() {
    const shapeNum = Math.floor(Math.random()*3);
    switch(shapeNum){
      case 0:
        return 'square'

        break;
      case 1:
        return 'rectangle'
        break;
      case 2:
        return 'circle'
        break;
    }
}

//pick random color
function randColor() {
    const colorNum = Math.floor(Math.random()*3);
    switch(colorNum){
      case 0:
        return 'blue'
        break;
      case 1:
        return 'red'
        break;
      case 2:
        return 'yellow'
        break;
    }
}











//function to make objects
function makeObj (n) {
    let obj = document.createElement('p')
    obj.id = `obj${n}`
    console.log(obj.id)
    obj.className += ` ${randShape()}`
    
    obj.className += ` ${randColor()}`
    document.body.appendChild(obj)
}

let i;
const button = document.getElementById('button');

//make number of objects equal to user input
function generate() {
    const numObj = document.getElementById('numObj').value;
    for (i=0; i < numObj; i++) {
        makeObj(i);
    }
}

button.addEventListener('click', generate);