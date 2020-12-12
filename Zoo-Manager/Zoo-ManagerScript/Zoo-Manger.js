//declare constants
const gameClock = document.getElementById('gameClock');
const gameDay = document.getElementById('gameDay');
const buy10FoodButton = document.getElementById('buy10FoodButton')
const buy100FoodButton = document.getElementById('buy100FoodButton');
const money = document.getElementById('money');
const nextIncome = document.getElementById('nextIncome');
const currentFood = document.getElementById('currentFood');
const start = document.getElementById('start');


//declare variables
let gameDayValue = 1
let gameHour = 7;
let ampm = 'am';
let buy10FoodCost = 1000
let buy100FoodCost = 10000
let income = 0;
let moneyCount = 1000;
let foodCount = 10;
let quantityPoints = 0;
let varietyPoints = 1.0;
let qualityPoints = 1.0;
let allAnimals = [];

//animal specific variables
const buyChimpanzeeButton = document.getElementById('buyChimpanzee');
const buyChimpanzeeHousingButton = document.getElementById('buyChimpanzeeHousing');
const buyChimpanzeeQualityButton = document.getElementById('buyChimpanzeeQuality');
const chimpamzeeRatio = document.getElementById('chimpamzeeRatio');
const chimpamzeeQuality = document.getElementById('chimpanzeeQuality');
const chimpanzeeFoodDiv = document.getElementById('chimpanzeeFood');
let allChimpanzees = [];
let chimpanzeeCount = 0;
let deadChimpanzeeCount = 0;




//class definitions
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
//chimpanzeeFeedSuper used in class definition
function chimpanzeeFeedSuper(n) {
    return function() {
        allChimpanzees[n-1].feed();
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
            fillDecreasePerHour: 1,
            fillIncreasePerFeed: 20,
        }
    }
    createHtml () {
        let chimpanzeeDiv = document.createElement('div');
        chimpanzeeDiv.id = `chimpanzee ${this.num} div`;
        chimpanzeeFoodDiv.appendChild(chimpanzeeDiv);
        chimpanzeeDiv.className = 'animalObject'
        let chimpanzeePic = document.createElement('img');
        chimpanzeePic.src = './Pictures/Chimpanzee.jpeg';
        chimpanzeePic.className = 'animalPic';
        chimpanzeeDiv.appendChild(chimpanzeePic);
        //image source: https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-15bnj6w_1851a868.jpeg
        //text instead of pic
        //let chimpanzeeP = document.createElement('p');
        //chimpanzeeP.innerHTML = `chimpanzee ${this.num}`;
        //chimpanzeeP.className = 'animalObjectName';
        //chimpanzeeDiv.appendChild(chimpanzeeP);
        let chimpanzeeFood = document.createElement('p');
        chimpanzeeFood.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`;
        chimpanzeeFood.id = `${this.species} ${this.num} food`;
        chimpanzeeFood.className = 'animalFoodMeter'
        chimpanzeeDiv.appendChild(chimpanzeeFood);
        let chimpanzeeFeed = document.createElement('input');
        chimpanzeeFeed.type='submit';
        chimpanzeeFeed.value='Feed 1'
        chimpanzeeFeed.id = `chimpanzee ${this.num}`;
        chimpanzeeFeed.className = 'animalFeedButton'
        chimpanzeeDiv.appendChild(chimpanzeeFeed);
        let chimpanzeeFeedListenerFunction = chimpanzeeFeedSuper(this.num);
        chimpanzeeFeed.addEventListener('click', chimpanzeeFeedListenerFunction);
    }
}





//House class definitions

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
        this.quantityPoints = 25
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
    }

    buyExpansion() {
        if (this.expansionLevel === 0) {
            if (moneyCount >= this.initialCost) {
                moneyCount -= this.initialCost;
                money.innerHTML = `Money: $${moneyCount}`;
                varietyPoints += 0.2;
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
                varietyPoints += 0.05;
                this.qualityLevel ++;
                this.quantityPoints = (50 * (1 + (0.5 * this.qualityLevel)));
            } 

        }
        else if (this.qualityLevel > 0) { 
            if (moneyCount >= (this.qualityLevel+1) * this.qualityInterval) {
                moneyCount -= (this.qualityLevel+1) * this.qualityInterval;
                money.innerHTML = `Money: $${moneyCount}`;
                varietyPoints += 0.05
                this.qualityLevel ++;
                this.quantityPoints = (50 * (1 + (0.5 * this.qualityLevel)));
            } 

        }

    }
}


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






//animal functions
let chimpanzeeHouse = new ChimpanzeeHouse('Chimpanzee House');

buyChimpanzeeHousingButton.value = `Expand Housing: $${(chimpanzeeHouse.expansionLevel+1) * chimpanzeeHouse.expansionInterval}`;
buyChimpanzeeQualityButton.value = `Upgrade Quality: $${chimpanzeeHouse.baseQualityCost}`;

function buyChimpanzeeHousing () {
    chimpanzeeHouse.buyExpansion()
    chimpanzeeRatio.innerHTML = (`Number of Chimpanzees: ${chimpanzeeCount}/${chimpanzeeHouse.maxHousing}`)
    buyChimpanzeeHousingButton.value = `Expand Housing: $${(chimpanzeeHouse.expansionLevel+1) * chimpanzeeHouse.expansionInterval}`;
}

function buyChimpanzeeQuality() {
    chimpanzeeHouse.buyQuality();
    buyChimpanzeeQualityButton.value = `Upgrade Quality: $${(chimpanzeeHouse.qualityLevel+1) * chimpanzeeHouse.qualityInterval}`;
    chimpanzeeQuality.innerHTML = `Housing Quality: ${chimpanzeeHouse.qualityLevel}`;
}

function buyChimpanzeeFunction() {
    if (moneyCount >= 200 && chimpanzeeCount < chimpanzeeHouse.maxHousing) {
        let a = new Chimpanzee(chimpanzeeCount+1);
        allAnimals.push(a);
        allChimpanzees.push(a);
        chimpanzeeCount++;
        a.createHtml();
        chimpanzeeRatio.innerHTML = (`Number of Chimpanzees: ${chimpanzeeCount}/${chimpanzeeHouse.maxHousing}`);
        moneyCount -= a.cost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyChimpanzeeHousingButton.addEventListener('click', buyChimpanzeeHousing);
buyChimpanzeeQualityButton.addEventListener('click', buyChimpanzeeQuality);
buyChimpanzeeButton.addEventListener('click', buyChimpanzeeFunction);



//final functions

//buy food functions
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

//Define hourTick and its subfunctions
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
            buy10FoodCost = Math.floor(buy10FoodCost * 1.1 * Math.pow(1.005, gameDayValue-1));
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

function receiveIncome () {
    moneyCount += income;
    money.innerHTML = `Money: $${moneyCount}`;
}

function updateIncome() {
    quantityPoints = chimpanzeeCount * chimpanzeeHouse.quantityPoints;
    income = quantityPoints * varietyPoints;
    nextIncome.innerHTML = `Next Income: ${income}`

}



function hungerAll() {
    allAnimals.forEach(animal => animal.hungerTick());
}


function hourTick() {
    clockTick();
    receiveIncome();
    updateIncome();
    hungerAll();
}


//define startGame
function startGame() {
    start.removeEventListener('click', startGame);
    buyChimpanzeeFunction();
    setInterval(hourTick, 2000);

}

start.addEventListener('click', startGame);
