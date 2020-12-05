const countr = document.getElementById('countr');
const button = document.getElementById('button');
let c=0;

function randColor() {
  num = Math.floor(Math.random()*8);
  switch(num){
    case 0:
      return 'blue'
      break;
    case 1:
      return 'red'
      break;
    case 2:
      return 'yellow'
      break;
    case 3:
      return 'orange'
      break;
    case 4:
      return 'purple'
      break;
    case 5:
      return 'green'
      break;
    case 6:
      return 'pink'
      break;
    case 7:
      return 'black'
      break;
    default:
      return 'black'
      break;
  }
}

function clickButton() {
  c++
  countr.innerHTML = `${c} Clicks!`
  const color1 = randColor()
  const color2 = randColor()
  button.style.color = color1
  button.style.border = `20px solid ${color2}`
  
}
button.addEventListener('click', clickButton);

