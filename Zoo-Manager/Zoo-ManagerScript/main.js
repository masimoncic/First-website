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
            buy10FoodCost = Math.floor(buy10FoodCost * 1.10 * Math.pow(1.005, gameDayValue-1));
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
let income = 200;
let moneyCount = 500;
let foodCount = 10;
let quantityPoints = 0;
let varietyPoints = 1.2;
let qualityPoints = 1.0;
function receiveIncome () {
    moneyCount += income;
    money.innerHTML = `Money: $${moneyCount}`;
}

//updateIncome 
const nextIncome = document.getElementById('nextIncome');
function updateIncome() {
    quantityPoints = chimpCount * chimpanzeeHouse.quantityPoints;
    income = quantityPoints * varietyPoints;
    nextIncome.innerHTML = `Next Income: ${income}`

}

//buy food
const currentFood = document.getElementById('currentFood');


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



let allAnimals = [];
let allChimps = [];
let chimpCount = 0;
//define classes
class Animal {
    constructor(num){
        this.num = num;
        this.name = `animal ${this.num}`
        this.cost = 100;
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
        let foodId = document.getElementById(`${this.species} ${this.num} food`);
        foodId.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`
    }
    feed() {
        let foodId = document.getElementById(`${this.species} ${this.num} food`)
        let fillRatio = 2 - (this.food.currentFill/this.food.maxFill);
        this.food.currentFill += Math.floor(fillRatio * this.food.fillIncreasePerFeed);
        foodCount --;
        foodId.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`
        currentFood.innerHTML = foodCount;
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


function chimpFeedSuper(n) {
    return function() {
        allChimps[n-1].feed();
    }
}

class Chimpanzee extends Animal {
    constructor(num) {
        super(num);
        this.species = 'chimpanzee';
        this.name = `${this.species} ${this.num}`
        this.cost = 200;
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 2,
            fillIncreasePerFeed: 20,
        }
    }
    createHtml () {
        let chimpanzeeP = document.createElement('p');
        chimpanzeeP.innerHTML = this.name;
        chimpanzeeFoodDiv.appendChild(chimpanzeeP);
        let chimpanzeeFood = document.createElement('p');
        chimpanzeeFood.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`;
        chimpanzeeFood.id = `${this.species} ${this.num} food`;
        chimpanzeeFoodDiv.appendChild(chimpanzeeFood);
        let chimpanzeeFeed = document.createElement('input');
        chimpanzeeFeed.type='submit';
        chimpanzeeFeed.value='Feed 1'
        chimpanzeeFeed.id = `chimpanzee ${this.num}`;
        chimpanzeeFoodDiv.appendChild(chimpanzeeFeed);
        let chimpFeedListenerFunction = chimpFeedSuper(this.num);
        chimpanzeeFeed.addEventListener('click', chimpFeedListenerFunction);
    }
}

const buyChimpanzeeButton = document.getElementById('buyChimpanzee');




/* createHtml test
        let chimpanzeeP = document.createElement('p');
        chimpanzeeP.innerHTML = a.name;
        chimpanzeeFoodDiv.appendChild(chimpanzeeP);
        let chimpanzeeFood = document.createElement('p');
        chimpanzeeFood.innerHTML = `${a.food.currentFill}/${a.food.maxFill}`;
        chimpanzeeFood.id = `${a.species} ${a.num} food`;
        chimpanzeeFoodDiv.appendChild(chimpanzeeFood);
        let chimpanzeeFeed = document.createElement('input');
        chimpanzeeFeed.type='submit';
        chimpanzeeFeed.value='Feed (consumes 1 food)'
        chimpanzeeFeed.id = `chimpanzee ${a.num}`;
        chimpanzeeFoodDiv.appendChild(chimpanzeeFeed);
        let chimpFeedListenerFunction = chimpFeedSuper(a.num);
        chimpanzeeFeed.addEventListener('click', chimpFeedListenerFunction);

*/







//define feeding function

//try having the function update the html element, modify internal values based on html
//need 3 paragraphs for current fill / max fill
function chimpanzeeFeedingFunction(n) {
    let tempChimp = allChimps[n-1];
    tempChimp.feed();
    let chimpMeter = document.getElementById(`chimpanzee${chimpCount}Food`);
    chimpMeter.innerHTML = `${tempChimp.food.currentFill}/${tempChimp.food.maxFill}`;

    
}
function chimpanzeeFeedingListener() {
    chimpanzeeFeedingFunction(chimpCount);
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
        this.baseQualityCost = 2000;
        this.qualityInterval = 10000;
        this.qualityPoints = 20;
        this.qualityLevel = 0;
        this.quantityPoints = 50
        //predefined properties
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
    }

    //methods
    buyExpansion() {
        if (this.expansionLevel === 0) {
            if (moneyCount >= this.initialCost) {
                moneyCount -= this.initialCost;
                money.innerHTML = `Money: $${moneyCount}`;
                this.expansionLevel ++;
                this.maxHousing += this.expansionHousingIncrease;
            } 

        }
        else if (this.expansionLevel > 0) { 
            if (moneyCount >= (this.expansionLevel+1) * this.expansionInterval) {
                moneyCount -= (this.expansionLevel+1) * this.expansionInterval;
                money.innerHTML = `Money: $${moneyCount}`;
                this.expansionLevel ++;
                this.maxHousing += this.expansionHousingIncrease;
            } 

        }

    }
    buyQuality() {
        if (this.qualityLevel === 0) {
            if (moneyCount >= this.baseQualityCost) {
                moneyCount -= this.baseQualityCost;
                money.innerHTML = `Money: $${moneyCount}`;
                this.qualityLevel ++;
                this.quantityPoints = (50 * (1 + (0.5 * this.qualityLevel)));
            } 

        }
        else if (this.qualityLevel > 0) { 
            if (moneyCount >= (this.qualityLevel+1) * this.qualityInterval) {
                moneyCount -= (this.qualityLevel+1) * this.qualityInterval;
                money.innerHTML = `Money: $${moneyCount}`;
                this.qualityLevel ++;
                this.quantityPoints = (50 * (1 + (0.5 * this.qualityLevel)));
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
        this.baseExpansionCost = 500;
        this.expansionInterval = 500;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 5000;
        this.qualityInterval = 5000;
        this.qualityPoints = 20;
        this.maxHousing = 4;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 1;
        this.qualityLevel = 0;
    }
        
}

let chimpanzeeHouse = new ChimpanzeeHouse('Chimpanzee House');
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

//functions for animals

//functions for chimpanzees

const buyChimpanzeeHousingButton = document.getElementById('buyChimpanzeeHousing');
buyChimpanzeeHousingButton.value = `Expand Housing: $${(chimpanzeeHouse.expansionLevel+1) * chimpanzeeHouse.expansionInterval}`;
const buyChimpanzeeQualityButton = document.getElementById('buyChimpanzeeQuality');
buyChimpanzeeQualityButton.value = `Upgrade Quality: $${chimpanzeeHouse.baseQualityCost}`
const chimpRatio = document.getElementById('chimpRatio');
const chimpQuality = document.getElementById('chimpQuality');



function buyChimpanzeeHousing () {
    chimpanzeeHouse.buyExpansion()
    chimpRatio.innerHTML = (`Number of Chimpanzees: ${chimpCount}/${chimpanzeeHouse.maxHousing}`)
    buyChimpanzeeHousingButton.value = `Expand Housing: $${(chimpanzeeHouse.expansionLevel+1) * chimpanzeeHouse.expansionInterval}`;
}

function buyChimpanzeeQuality() {
    chimpanzeeHouse.buyQuality();
    buyChimpanzeeQualityButton.value = `Upgrade Quality: $${(chimpanzeeHouse.qualityLevel+1) * chimpanzeeHouse.qualityInterval}`;
    chimpQuality.innerHTML = `Housing Quality: ${chimpanzeeHouse.qualityLevel}`;
}


buyChimpanzeeHousingButton.addEventListener('click', buyChimpanzeeHousing);
buyChimpanzeeQualityButton.addEventListener('click', buyChimpanzeeQuality);
//buy chimpanzee function
const chimpanzeeFoodDiv = document.getElementById('chimpanzeeFood');



function buyChimpanzeeFunction() {
    if (moneyCount >= 200 && chimpCount < chimpanzeeHouse.maxHousing) {
        let a = new Chimpanzee(chimpCount+1);
        allAnimals.push(a);
        allChimps.push(a);
        chimpCount++;
        a.createHtml();
        chimpRatio.innerHTML = (`Number of Chimpanzees: ${chimpCount}/${chimpanzeeHouse.maxHousing}`);
        moneyCount -= a.cost;
        money.innerHTML = `Money: $${moneyCount}`;

     
    }
}
buyChimpanzeeButton.addEventListener('click', buyChimpanzeeFunction);




//hungerTick function
function hungerAll() {
    allAnimals.forEach(animal => animal.hungerTick());
}


function hourTick() {
    clockTick();
    receiveIncome();
    updateIncome();
    hungerAll();
}





//declare vars and functions for start button
const start = document.getElementById('start');
function startGame() {
    start.removeEventListener('click', startGame);
    buyChimpanzeeFunction();
    setInterval(hourTick, 3000);

}


start.addEventListener('click', startGame);