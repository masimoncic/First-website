//declare variables for clockTick

const gameClock = document.getElementById('gameClock');
const gameDay = document.getElementById('gameDay');
let gameDayValue = 1
let gameHour = 7;
let ampm = 'am';
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
let income = 1000;
let moneyCount = 5000;
function receiveIncome () {
    moneyCount += income;
    money.innerHTML = `Money: $${moneyCount}`;
}

//updateIncome 
const nextIncome = document.getElementById('nextIncome');
function updateIncome() {
    //placeholder
    income = gameHour*10
    nextIncome.innerHTML = `Next Income: ${income}`

}


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
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
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

let chimpanzeeHouse = new ChimpanzeeHouse('Chimpanzee House');

function buyChimpanzeeHousing () {
    chimpanzeeHouse.buyExpansion()
    chimpRatio.innerHTML = (`Number of Chimpanzees: 0/${chimpanzeeHouse.maxHousing}`)
    buyChimpanzeeHousingButton.value = `Expand Housing: $${chimpanzeeHouse.expansionLevel * chimpanzeeHouse.expansionInterval}`;
}


buyChimpanzeeHousingButton.addEventListener('click', buyChimpanzeeHousing);












function hourTick() {
    clockTick();
    receiveIncome();
    updateIncome();
}





//declare vars and functions for start button
const start = document.getElementById('start');
function startGame() {
    setInterval(hourTick, 500);
}
start.addEventListener('click', startGame);

