//set up variables for properties
let squareP = '[[Square]] = {';
let rectangleP = '[[Rectangle]] = {';
let circleP = '[[Circle]] {';






//pick random values

//pick random shape
function randShape(n) {
    const shapeNum = Math.floor(Math.random()*3);
    switch(shapeNum){
      case 0:
        squareP += `, obj${n}`;
        return 'square';
        break;
      case 1:
        rectangleP += `, obj${n}`;
        return 'rectangle';
        break;
      case 2:
        circleP += `, obj${n}`;
        return 'circle';
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
    obj.className += ` ${randShape(n)}`
    obj.className += ` ${randColor()}`
    document.body.appendChild(obj)
}

let i;
const button = document.getElementById('button');




//functions to create semantic value displays
function squareFill() {
    squareP += '}'
    let squareVal = document.createElement('p')
    squareVal.innerHTML = squareP;
    squareVal.id = 'squareVal'
    document.body.appendChild(squareVal);
}
function rectangleFill() {
    rectangleP += '}'
    let rectangleVal = document.createElement('p')
    rectangleVal.innerHTML = squareP;
    rectangleVal.id = 'rectangleVal'
    document.body.appendChild(rectangleVal);
}
function circleFill() {
    circleP += '}'
    let circleVal = document.createElement('p')
    circleVal.innerHTML = circleP;
    circleVal.id = 'squareVal'
    document.body.appendChild(circleVal);
}

//make number of objects equal to user input, then run all semantic value functions
function generate() {
    const numObj = document.getElementById('numObj').value;
    for (i=0; i < numObj; i++) {
        makeObj(i);
    }
    squareFill();
    rectangleFill();
    circleFill();

}


button.addEventListener('click', generate);