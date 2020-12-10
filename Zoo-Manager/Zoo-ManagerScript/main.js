//declare variables for clockTick

const gameClock = document.getElementById('gameClock');
const gameDay = document.getElementById('gameDay');
let gameDayValue = 1
let gameHour = 7;
let ampm = 'am';

//define variable for food
const buy10FoodButton = document.getElementById('buy10FoodButton')
let buy10FoodCost = 1000
const buy100FoodButton = document.getElementById('buy100FoodButton');
let buy100FoodCost = 10000
function clockTick() {
    if (gameHour === 11) {
        gameHour = 12;
        if (ampm === 'am') {
            ampm = 'pm'
        }
        else {
            ampm = 'am';
            gameDayValue += 1;
            gameDay.innerHTML = `Day ${gameDayValue}`;
            buy10FoodCost = Math.floor(buy10FoodCost * 1.05 * Math.pow(1.002, gameDayValue-1));
            buy100FoodCost = buy10FoodCost * 10;
            buy10FoodButton.value = `Buy 10 Food $${buy10FoodCost}`
            buy100FoodButton.value = `Buy 100 Food $${buy100FoodCost}`

        }
    } else if (gameHour === 12) {
        gameHour = 1;
    }
    else {
        gameHour += 1
    }
    gameClock.innerHTML = `${gameHour} ${ampm}`;
}




//declare variables for receiveIncome
const money = document.getElementById('money');
let income = 100;
let moneyCount = 20000;
let quantityPoints = 100;
let varietyPoints = 1.2;
let qualityPoints = 1.0;
function receiveIncome () {
    moneyCount += income;
    money.innerHTML = `Money: $${moneyCount}`;
}

//updateIncome 
const nextIncome = document.getElementById('nextIncome');
function updateIncome() {
    //placeholder
    income = quantityPoints * varietyPoints * qualityPoints;
    nextIncome.innerHTML = `Next Income: ${income}`

}

//buy food
const currentFood = document.getElementById('currentFood');
let foodCount = 0;


function buy10FoodFunction() {
    if (moneyCount >= buy10FoodCost) {
        moneyCount -= buy10FoodCost;
        foodCount += 10;
        currentFood.innerHTML = `Food: ${foodCount}`;  
    }
}

function buy100FoodFunction() {
    if (moneyCount >= buy100FoodCost) {
        moneyCount -= buy100FoodCost;
        foodCount += 100;
        currentFood.innerHTML = `Food: ${foodCount}`;  
    }
}



buy10FoodButton.addEventListener('click', buy10FoodFunction);
buy100FoodButton.addEventListener('click', buy100FoodFunction);


//define classes
class Animal {
    constructor(name){
        this.name = name;
        this.cost = 100;
        this.quantityPoints = 100;
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 20,
            fillIncreasePerFeed: 20,
        }
    }
    //methods
    hungerTick() {
        this.food.currentFill -= this.food.fillDecreasePerHour;
    }
    feed() {
        let fillRatio = 2 - (this.food.currentFill/this.food.maxFill);
        this.food.currentFill += fillRatio * this.food.fillIncreasePerFeed;
        //foodCount not yet defined
        //foodCount --;
    }
}

/*test function
function test() {
    let a = new Animal('a');
    console.log(a);
    console.log(a.food);
    a.hungerTick();
    console.log(a.food);
    a.feed();
    console.log(a.food);
}*/


class Chimpanzee extends Animal {
    constructor(name) {
        super(name);
        this.cost = 100;
        this.quantityPoints = 100;
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 20,
            fillIncreasePerFeed: 20,
        }
    }
}

//test function
/*function testChimp() {
    let a = new Chimpanzee('a');
    console.log(a);
    console.log(a.food);
    a.hungerTick();
    console.log(a.food);
    a.feed();
    console.log(a.food);
}*/



class House {
    constructor(name) {
        this.name = name;
        this.initialCost = 500;
        this.baseExpansionCost = 200;
        this.expansionInterval = 200;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 5000;
        this.qualityInterval = 10000;
        this.qualityPoints = 20;

        //predefined properties
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }

    //methods
    buyExpansion() {
        if (this.expansionLevel === 0) {
            if (moneyCount >= this.baseQualityCost) {
                moneyCount -= this.initialCost;
                this.expansionLevel ++;
                this.maxHousing += this.expansionHousingIncrease;
            } 

        }
        else if (this.expansionLevel > 0) { 
            if (moneyCount >= this.expansionLevel * this.expansionInterval) {
                moneyCount -= this.expansionLevel * this.expansionInterval;
                this.expansionLevel ++;
                this.maxHousing += this.expansionHousingIncrease;
            } 

        }

    }
}


//test for buyExpansion
/*function testBuyExp() {
    let a = new House('a');
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
}*/


//save element ids to variables

class ChimpanzeeHouse extends House {
    constructor(name) {
        super(name);
        this.initialCost = 500;
        this.baseExpansionCost = 200;
        this.expansionInterval = 200;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 5000;
        this.qualityInterval = 10000;
        this.qualityPoints = 20;
        this.maxHousing = 4;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 1;
        this.qualityLevel = 0;
    }
        
}


//test for buyExpansion
/*function testChimpBuyExp() {
    let a = new ChimpanzeeHouse('a');
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
    a.buyExpansion();
    console.log(moneyCount, a.expansionLevel, a.maxHousing);
}*/



//functions for chimpanzees
const buyChimpanzeeButton = document.getElementById('buyChimpanzee');
const buyChimpanzeeHousingButton = document.getElementById('buyChimpanzeeHousing');
const buyChimpanzeeQualityButton = document.getElementById('buyChimpanzeeQuality');
const chimpRatio = document.getElementById('chimpRatio');
let chimpCount = 1

let chimpanzeeHouse = new ChimpanzeeHouse('Chimpanzee House');

function buyChimpanzeeHousing () {
    chimpanzeeHouse.buyExpansion()
    chimpRatio.innerHTML = (`Number of Chimpanzees: 0/${chimpanzeeHouse.maxHousing}`)
    buyChimpanzeeHousingButton.value = `Expand Housing: $${chimpanzeeHouse.expansionLevel * chimpanzeeHouse.expansionInterval}`;
}


buyChimpanzeeHousingButton.addEventListener('click', buyChimpanzeeHousing);

//create starting chimpanzee

//make this into a method?
//or just a function and include the function call here 
let chimpanzee1 = new Chimpanzee('chimpanzee 1');
const chimpanzeeFoodDiv = document.getElementById('chimpanzeeFood');

let chimpanzee1P = document.createElement('p');
chimpanzee1P.innerHTML = 'Chimpanzee 1';
chimpanzeeFoodDiv.appendChild(chimpanzee1P);
let chimpanzee1Food = document.createElement('p');
chimpanzee1Food.innerHTML = `${chimpanzee1.food.currentFill}/${chimpanzee1.food.maxFill}`;
chimpanzeeFoodDiv.appendChild(chimpanzee1Food);
let chimpanzee1Feed = document.createElement('input');
chimpanzee1Feed.type='submit';
chimpanzee1Feed.value='Feed (consumes 1 food)';
chimpanzeeFoodDiv.appendChild(chimpanzee1Feed);






















function hourTick() {
    clockTick();
    receiveIncome();
    updateIncome();
}





//declare vars and functions for start button
const start = document.getElementById('start');
function startGame() {
    setInterval(hourTick, 250);
}
start.addEventListener('click', startGame);

