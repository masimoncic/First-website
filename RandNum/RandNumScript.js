const input1 = document.getElementById('int1');
const input2 = document.getElementById('int2');
const button = document.getElementById('button');
const randVal = document.getElementById('randVal');

function gen() {
    let int1 = Number(input1.value);
    let int2 = Number(input2.value);
    num = Math.floor(Math.random()*
        (int2  - int1 + 1))
    //get random number within range
        randVal.innerHTML = num+int1;
    //add minimum value to that number

}
button.addEventListener('click', gen);
