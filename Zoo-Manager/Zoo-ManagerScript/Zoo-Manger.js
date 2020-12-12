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
let moneyCount = 1050;
let foodCount = 10;
let quantityPoints = 0;
let varietyPoints = 1.0;
let qualityPoints = 1.0;
let allAnimals = [];
let deadContainer = [];

//animal specific variables
const buyChimpanzeeButton = document.getElementById('buyChimpanzee');
const buyChimpanzeeHousingButton = document.getElementById('buyChimpanzeeHousing');
const buyChimpanzeeQualityButton = document.getElementById('buyChimpanzeeQuality');
const chimpanzeeRatio = document.getElementById('chimpanzeeRatio');
const chimpanzeeQuality = document.getElementById('chimpanzeeQuality');
const chimpanzeeFoodDiv = document.getElementById('chimpanzeeFood');
let allChimpanzees = [];
let chimpanzeeCount = 0;
let deadChimpanzeeCount = 0;

const buyPenguinButton = document.getElementById('buyPenguin');
const buyPenguinHousingButton = document.getElementById('buyPenguinHousing');
const buyPenguinQualityButton = document.getElementById('buyPenguinQuality');
const penguinRatio = document.getElementById('penguinRatio');
const penguinQuality = document.getElementById('penguinQuality');
const penguinFoodDiv = document.getElementById('penguinFood');
let allPenguins = [];
let penguinCount = 0;
let deadPenguinCount = 0;

const buyTigerButton = document.getElementById('buyTiger');
const buyTigerHousingButton = document.getElementById('buyTigerHousing');
const buyTigerQualityButton = document.getElementById('buyTigerQuality');
const tigerRatio = document.getElementById('tigerRatio');
const tigerQuality = document.getElementById('tigerQuality');
const tigerFoodDiv = document.getElementById('tigerFood');
let allTigers = [];
let tigerCount = 0;
let deadTigerCount = 0;




//class definitions
class Animal {
    constructor(num){
        this.num = num;
        this.alive = 1;
        this.name = `animal ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 20,
            fillIncreasePerFeed: 20,
            foodConsumed: 1
        }
    }
    hungerTick() {
        if (this.alive === 1){
            this.food.currentFill -= this.food.fillDecreasePerHour;
            let foodId = document.getElementById(`${this.species} ${this.num} food`);
            foodId.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`
            if (this.food.currentFill <= 0) {
                foodId.innerHTML = 'dead';
                this.alive = 0;
            }
        }
    }
    feed() {
        if (foodCount >= this.food.foodConsumed) {
            let foodId = document.getElementById(`${this.species} ${this.num} food`)
            let fillRatio = 2 - (this.food.currentFill/this.food.maxFill);
            let fillCount = Math.floor(fillRatio * this.food.fillIncreasePerFeed)
            this.food.currentFill = Math.min(this.food.currentFill + fillCount, 100);
            foodCount -= this.food.foodConsumed;
            foodId.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`
            currentFood.innerHTML = foodCount;
        }
    }
    createHtml () {
        let animalDiv = document.createElement('div');
        animalDiv.id = `${this.species} ${this.num} div`;
        let animalFoodDiv = document.getElementById(`${this.species}Food`);
        animalFoodDiv.appendChild(animalDiv);
        animalDiv.className = 'animalObject'
        //pic instead of text
        let animalPic = document.createElement('img');
        animalPic.src = `./Pictures/${this.species}.jpeg`;
        animalPic.className = 'animalPic';
        animalDiv.appendChild(animalPic);
        //text instead of pic
        //let animalP = document.createElement('p');
        //animalP.innerHTML = `${this.species} ${this.num}`;
        //animalP.className = `$animalObjectName`;
        //animalDiv.appendChild(animalP);
        let animalFood = document.createElement('p');
        animalFood.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`;
        animalFood.id = `${this.species} ${this.num} food`;
        animalFood.className = `$animalFoodMeter`
        animalDiv.appendChild(animalFood);
        let animalFeed = document.createElement('input');
        animalFeed.type='submit';
        animalFeed.value=`Feed ${this.food.foodConsumed}`
        animalFeed.id = `${this.species} ${this.num}`;
        animalFeed.className = 'animalFeedButton';
        animalDiv.appendChild(animalFeed);
    
    }
}





//House class definitions

class House {
    constructor(name) {
        this.name = name;
        this.initialCost = 500;
        this.expansionInterval = 200;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 2000;
        this.qualityInterval = 10000;
        this.qualityPoints = 20;
        this.qualityLevel = 0;
        this.quantityPoints = 25;
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


//animal specific section

//chimpanzee

class Chimpanzee extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'chimpanzee';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 1,
            fillIncreasePerFeed: 30,
            foodConsumed: 1,
        }
    }
}


class ChimpanzeeHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 50
        this.initialCost = 500;
        this.expansionInterval = 125;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 4000;
        this.qualityInterval = 4000;
        this.quantityPoints = 8;
        this.maxHousing = 4;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 1;
        this.qualityLevel = 0;
    }
        
}


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

function chimpanzeeFeedSuper(n) {
    return function() {
        allChimpanzees[n-1].feed();
    }
}
function buyChimpanzeeFunction() {
    if (moneyCount >= chimpanzeeHouse.animalCost && chimpanzeeCount < chimpanzeeHouse.maxHousing) {
        let a = new Chimpanzee(chimpanzeeCount+1);
        allAnimals.push(a);
        allChimpanzees.push(a);
        chimpanzeeCount++;
        a.createHtml();
        let chimpanzeeFeedListenerFunction = chimpanzeeFeedSuper(a.num);
        let chimpanzeeFeed =document.getElementById(`${a.species} ${a.num}`);
        chimpanzeeFeed.addEventListener('click', chimpanzeeFeedListenerFunction);
        chimpanzeeRatio.innerHTML = (`Number of Chimpanzees: ${chimpanzeeCount}/${chimpanzeeHouse.maxHousing}`);
        moneyCount -= chimpanzeeHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyChimpanzeeHousingButton.addEventListener('click', buyChimpanzeeHousing);
buyChimpanzeeQualityButton.addEventListener('click', buyChimpanzeeQuality);
buyChimpanzeeButton.addEventListener('click', buyChimpanzeeFunction);

//Penguins

class Penguin extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'penguin';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 100,
            fillDecreasePerHour: 4,
            fillIncreasePerFeed: 50,
            foodConsumed: 1,
        }
    }
}


class PenguinHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 500;
        this.initialCost = 1000;
        this.expansionInterval = 3000;
        this.expansionHousingIncrease = 2;
        this.baseQualityCost = 10000;
        this.qualityInterval = 10000;
        this.quantityPoints = 80;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let penguinHouse = new PenguinHouse('Penguin House');

buyPenguinHousingButton.value = `Expand Housing: $${penguinHouse.initialCost}`;
buyPenguinQualityButton.value = `Upgrade Quality: $${penguinHouse.baseQualityCost}`;

function buyPenguinHousing () {
    penguinHouse.buyExpansion()
    penguinRatio.innerHTML = (`Number of Penguins: ${penguinCount}/${penguinHouse.maxHousing}`)
    buyPenguinHousingButton.value = `Expand Housing: $${(penguinHouse.expansionLevel+1) * penguinHouse.expansionInterval}`;
}

function buyPenguinQuality() {
    penguinHouse.buyQuality();
    buyPenguinQualityButton.value = `Upgrade Quality: $${(penguinHouse.qualityLevel+1) * penguinHouse.qualityInterval}`;
    penguinQuality.innerHTML = `Housing Quality: ${penguinHouse.qualityLevel}`;
}

function PenguinFeedSuper(n) {
    return function() {
        allPenguins[n-1].feed();
    }
}
function buyPenguinFunction() {
    if (moneyCount >= penguinHouse.animalCost && penguinCount < penguinHouse.maxHousing) {
        let a = new Penguin(penguinCount+1);
        allAnimals.push(a);
        allPenguins.push(a);
        penguinCount++;
        a.createHtml();
        let PenguinFeedListenerFunction = PenguinFeedSuper(a.num);
        let penguinFeed =document.getElementById(`${a.species} ${a.num}`);
        penguinFeed.addEventListener('click', PenguinFeedListenerFunction);
        penguinRatio.innerHTML = (`Number of Penguins: ${penguinCount}/${penguinHouse.maxHousing}`);
        moneyCount -= penguinHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyPenguinHousingButton.addEventListener('click', buyPenguinHousing);
buyPenguinQualityButton.addEventListener('click', buyPenguinQuality);
buyPenguinButton.addEventListener('click', buyPenguinFunction);

//Tigers


class Tiger extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'tiger';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 2,
            fillIncreasePerFeed: 10,
            foodConsumed: 10,
        }
    }
}


class TigerHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 1000;
        this.initialCost = 500;
        this.expansionInterval = 500;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 4000;
        this.qualityInterval = 4000;
        this.quantityPoints = 200;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let tigerHouse = new TigerHouse('tiger House');

buyTigerHousingButton.value = `Expand Housing: $${tigerHouse.initialCost}`;
buyTigerQualityButton.value = `Upgrade Quality: $${tigerHouse.baseQualityCost}`;

function buyTigerHousing () {
    tigerHouse.buyExpansion()
    tigerRatio.innerHTML = (`Number of Tigers: ${tigerCount}/${tigerHouse.maxHousing}`)
    buyTigerHousingButton.value = `Expand Housing: $${(tigerHouse.expansionLevel+1) * tigerHouse.expansionInterval}`;
}

function buyTigerQuality() {
    tigerHouse.buyQuality();
    buyTigerQualityButton.value = `Upgrade Quality: $${(tigerHouse.qualityLevel+1) * tigerHouse.qualityInterval}`;
    TigerQuality.innerHTML = `Housing Quality: ${tigerHouse.qualityLevel}`;
}

function tigerFeedSuper(n) {
    return function() {
        allTigers[n-1].feed();
    }
}
function buyTigerFunction() {
    if (moneyCount >= tigerHouse.animalCost && tigerCount < tigerHouse.maxHousing) {
        let a = new Tiger(tigerCount+1);
        allAnimals.push(a);
        allTigers.push(a);
        tigerCount++;
        a.createHtml();
        let tigerFeedListenerFunction = tigerFeedSuper(a.num);
        let tigerFeed =document.getElementById(`${a.species} ${a.num}`);
        tigerFeed.addEventListener('click', tigerFeedListenerFunction);
        tigerRatio.innerHTML = (`Number of Tigers: ${tigerCount}/${tigerHouse.maxHousing}`);
        moneyCount -= tigerHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyTigerHousingButton.addEventListener('click', buyTigerHousing);
buyTigerQualityButton.addEventListener('click', buyTigerQuality);
buyTigerButton.addEventListener('click', buyTigerFunction);


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

//define lifeCheck functions 





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
            allChimpanzees.forEach(element => {
                if (element.alive === 0) {
                    deadChimpanzeeCount ++;
                    element.alive = 2;
                }
            })
            allPenguins.forEach(element => {
                if (element.alive === 0) {
                    deadPenguinCount ++;
                    element.alive = 2;
                }
            })
            allTigers.forEach(element => {
                if (element.alive === 0) {
                    deadTigerCount ++;
                    element.alive = 2;
                }
            });

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
    quantityPoints = (chimpanzeeCount - deadChimpanzeeCount) * chimpanzeeHouse.quantityPoints + (penguinCount - deadPenguinCount) * penguinHouse.quantityPoints +
     (tigerCount - deadTigerCount) * tigerHouse.quantityPoints;
    income = Math.floor(quantityPoints * varietyPoints);
    nextIncome.innerHTML = `Next Income: ${income}`;

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
    setInterval(hourTick, 500);

}

start.addEventListener('click', startGame);
