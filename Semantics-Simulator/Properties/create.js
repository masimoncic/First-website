//set up variables for properties
let squareP = '[[Square]] = {';
let rectangleP = '[[Rectangle]] = {';
let circleP = '[[Circle]] = {';
let redP = '[[Red]] = {';
let blueP = '[[Blue]] = {';
let yellowP = '[[Yellow]] = {';






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
function randColor(n) {
    const colorNum = Math.floor(Math.random()*3);
    switch(colorNum){
      case 0:
        blueP += `, obj${n}`;
        return 'blue';
        break;
      case 1:
        redP += `, obj${n}`;
        return 'red';
        break;
      case 2:
        yellowP += `, obj${n}`;
        return 'yellow';
        break;
    }
}






//function to make objects
function makeObj (n) {
    let obj = document.createElement('p')
    obj.id = `obj${n}`
    obj.className += ` ${randShape(n)}`
    obj.className += ` ${randColor(n)}`
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
    rectangleVal.innerHTML = rectangleP;
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
function redFill() {
    redP += '}'
    let redVal = document.createElement('p')
    redVal.innerHTML = redP;
    redVal.id = 'redVal'
    document.body.appendChild(redVal);
}
function blueFill() {
    blueP += '}'
    let blueVal = document.createElement('p')
    blueVal.innerHTML = blueP;
    blueVal.id = 'blueVal'
    document.body.appendChild(blueVal);
}
function yellowFill() {
    yellowP += '}'
    let yellowVal = document.createElement('p')
    yellowVal.innerHTML = yellowP;
    yellowVal.id = 'yellowVal'
    document.body.appendChild(yellowVal);
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
    redFill();
    blueFill();
    yellowFill();

}


button.addEventListener('click', generate);