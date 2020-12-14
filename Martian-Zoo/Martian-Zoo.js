//declare constants
const gameClock = document.getElementById('gameClock');
const gameDay = document.getElementById('gameDay');
const buy10FoodButton = document.getElementById('buy10FoodButton')
const buy100FoodButton = document.getElementById('buy100FoodButton');
const money = document.getElementById('money');
const nextIncome = document.getElementById('nextIncome');
const currentFood = document.getElementById('currentFood');
const mainDiv = document.getElementById('main');
const gameOver = document.getElementById('gameOver');
const victoryScreen = document.getElementById('victoryScreen');
const difficulty = document.getElementById('difficulty'); 
const gameSpeed = document.getElementById('gameSpeed')
const start = document.getElementById('start');


//declare variables
let gameDayValue = 1
let gameHour = 7;
let ampm = 'am';
let buy5FoodCost = 700
let buy50FoodCost = 7000
let income = 0;
let moneyCount = 200;
let foodCount = 10;
let quantityPoints = 0;
let varietyPoints = 1.0;
let qualityPoints = 1.0;
let allAnimals = [];
let deadContainer = [];
let difficultyLevel = -1;

//animal specific variables
const martianFoodDiv = document.getElementById('martianFood');


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

const buyPandaButton = document.getElementById('buyPanda');
const buyPandaHousingButton = document.getElementById('buyPandaHousing');
const buyPandaQualityButton = document.getElementById('buyPandaQuality');
const pandaRatio = document.getElementById('pandaRatio');
const pandaQuality = document.getElementById('pandaQuality');
const pandaFoodDiv = document.getElementById('pandaFood');
let allPandas = [];
let pandaCount = 0;
let deadPandaCount = 0;

const buyAlligatorButton = document.getElementById('buyAlligator');
const buyAlligatorHousingButton = document.getElementById('buyAlligatorHousing');
const buyAlligatorQualityButton = document.getElementById('buyAlligatorQuality');
const alligatorRatio = document.getElementById('alligatorRatio');
const alligatorQuality = document.getElementById('alligatorQuality');
const alligatorFoodDiv = document.getElementById('alligatorFood');
let allAlligators = [];
let alligatorCount = 0;
let deadAlligatorCount = 0;

const buyElephantButton = document.getElementById('buyElephant');
const buyElephantHousingButton = document.getElementById('buyElephantHousing');
const buyElephantQualityButton = document.getElementById('buyElephantQuality');
const elephantRatio = document.getElementById('elephantRatio');
const elephantQuality = document.getElementById('elephantQuality');
const elephantFoodDiv = document.getElementById('elephantFood');
let allElephants = [];
let elephantCount = 0;
let deadElephantCount = 0;



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
            foodId.style.width = `${this.food.currentFill}%`;
            if (this.food.currentFill <= 0) {
                foodId.innerHTML = 'dead';
                this.alive = 0;
            }
        }
    }
    feed() {
        if (foodCount >= this.food.foodConsumed) {
            if (this.alive === 1) {
                let foodId = document.getElementById(`${this.species} ${this.num} food`)
                let fillRatio = 2 - (this.food.currentFill/this.food.maxFill);
                let fillCount = Math.floor(fillRatio * this.food.fillIncreasePerFeed)
                this.food.currentFill = Math.min(this.food.currentFill + fillCount, 100);
                foodCount -= this.food.foodConsumed;
                foodId.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`
                foodId.style.width = `${this.food.currentFill}%`;
                currentFood.innerHTML = foodCount;
            }
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
        //animalPic.src = `./Pictures/${this.species}.jpeg`;
        animalPic.className = 'animalPic';
        animalPic.id = `${this.species}${this.num}Pic`
        animalDiv.appendChild(animalPic);
        //text instead of pic
        //let animalP = document.createElement('p');
        //animalP.innerHTML = `${this.species} ${this.num}`;
        //animalP.className = `$animalObjectName`;
        //animalDiv.appendChild(animalP);
        let animalFoodContainer = document.createElement('p');
        animalFoodContainer.className = 'animalFoodContainer';
        animalDiv.appendChild(animalFoodContainer);
        let animalFood = document.createElement('p');
        animalFood.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`;
        animalFood.style.width = `${this.food.currentFill}%`;
        animalFood.id = `${this.species} ${this.num} food`;
        animalFoodContainer.appendChild(animalFood);
        animalFood.className = `animalFoodMeter`;
        let animalFeed = document.createElement('input');
        animalFeed.type='submit';
        animalFeed.value=`Feed ${this.food.foodConsumed}`
        animalFeed.id = `${this.species} ${this.num}`;
        animalFeed.className = 'animalFeedButton';
        animalFoodContainer.appendChild(animalFeed);
    
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
                varietyPoints += 0.03;
                this.qualityLevel ++;
                this.quantityPoints = (this.baseQuantityPoints * (1 + (0.25 * this.qualityLevel)));
            } 

        }
        else if (this.qualityLevel > 0) { 
            if (moneyCount >= (this.qualityLevel+1) * this.qualityInterval) {
                moneyCount -= (this.qualityLevel+1) * this.qualityInterval;
                money.innerHTML = `Money: $${moneyCount}`;
                varietyPoints += 0.03
                this.qualityLevel ++;
                this.quantityPoints = (this.baseQuantityPoints * (1 + (0.25 * this.qualityLevel)));
            } 

        }

    }
}


//animal specific section

//chimpanzee

class Martian extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'martian';
        this.name = 'martian 1';
        this.food = {
            maxFill: 100,
            currentFill: 100,
            fillDecreasePerHour: 5,
            fillIncreasePerFeed: 20,
            foodConsumed: 4,

        }
    }
}

let martian = new Martian(1);
let martianQuantityPoints= 450;
allAnimals.push(martian);
function martianFeedListener() {
    martian.feed();
}
let martianFeed = document.getElementById('martian 1');
martianFeed.addEventListener('click', martianFeedListener);

//chimpanzees



class Chimpanzee extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'chimpanzee';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 100,
            fillDecreasePerHour: 10 + (2*difficultyLevel),
            fillIncreasePerFeed: 40,
            foodConsumed: 2,
        }
    }
}


class ChimpanzeeHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 50
        this.initialCost = 500;
        this.expansionInterval = 500;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 5000;
        this.qualityInterval = 5000;
        this.quantityPoints = 50;
        this.baseQuantityPoints= 50;
        this.maxHousing = 4;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 1;
        this.qualityLevel = 0;
    }
        
}





//chimpanzees
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
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-15bnj6w_1851a868.jpeg'
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
            currentFill: 50,
            fillDecreasePerHour: 6 + (4*difficultyLevel),
            fillIncreasePerFeed: 80,
            foodConsumed: 1,
        }
    }
}


class PenguinHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 500;
        this.initialCost = 4000;
        this.expansionInterval = 4000;
        this.expansionHousingIncrease = 2;
        this.baseQualityCost = 5000;
        this.qualityInterval = 5000;
        this.quantityPoints = 130;
        this.baseQuantityPoints = 130;
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
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iKIWgaiJUtss/v2/1000x-1.jpg';
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
            fillDecreasePerHour: 4 + (1*difficultyLevel),
            fillIncreasePerFeed: 26 - (4*difficultyLevel),
            foodConsumed: 10,
        }
    }
}


class TigerHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 1500;
        this.initialCost = 500;
        this.expansionInterval = 1000;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 10000;
        this.qualityInterval = 10000;
        this.quantityPoints = 190;
        this.baseQuantityPoints = 190;
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
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://moffitt.org/media/13049/malayan-tiger-1440.jpg?center=0.36923076923076925,0.33275563258232238&mode=crop&width=375&height=340&rnd=132465452190000000';
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


//Pandas

class Panda extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'panda';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 5 +(2*difficultyLevel),
            fillIncreasePerFeed: 30,
            foodConsumed: 2,
        }
    }
}


class PandaHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 40000;
        this.initialCost = 30000;
        this.expansionInterval = 30000;
        this.expansionHousingIncrease = 2;
        this.baseQualityCost = 25000;
        this.qualityInterval = 25000;
        this.quantityPoints = 1200;
        this.baseQuantityPoints = 1200;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let pandaHouse = new PandaHouse('Panda House');

buyPandaHousingButton.value = `Expand Housing: $${pandaHouse.initialCost}`;
buyPandaQualityButton.value = `Upgrade Quality: $${pandaHouse.baseQualityCost}`;

function buyPandaHousing () {
    pandaHouse.buyExpansion()
    pandaRatio.innerHTML = (`Number of Pandas: ${pandaCount}/${pandaHouse.maxHousing}`)
    buyPandaHousingButton.value = `Expand Housing: $${(pandaHouse.expansionLevel+1) * pandaHouse.expansionInterval}`;
}

function buyPandaQuality() {
    pandaHouse.buyQuality();
    buyPandaQualityButton.value = `Upgrade Quality: $${(pandaHouse.qualityLevel+1) * pandaHouse.qualityInterval}`;
    pandaQuality.innerHTML = `Housing Quality: ${pandaHouse.qualityLevel}`;
}

function pandaFeedSuper(n) {
    return function() {
        allPandas[n-1].feed();
    }
}
function buyPandaFunction() {
    if (moneyCount >= pandaHouse.animalCost && pandaCount < pandaHouse.maxHousing) {
        let a = new Panda(pandaCount+1);
        allAnimals.push(a);
        allPandas.push(a);
        pandaCount++;
        a.createHtml();
        let pandaFeedListenerFunction = pandaFeedSuper(a.num);
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.fit-760w.jpg'
        let pandaFeed =document.getElementById(`${a.species} ${a.num}`);
        pandaFeed.addEventListener('click', pandaFeedListenerFunction);
        pandaRatio.innerHTML = (`Number of Pandas: ${pandaCount}/${pandaHouse.maxHousing}`);
        moneyCount -= pandaHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyPandaHousingButton.addEventListener('click', buyPandaHousing);
buyPandaQualityButton.addEventListener('click', buyPandaQuality);
buyPandaButton.addEventListener('click', buyPandaFunction);

//alligators

class Alligator extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'alligator';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 80,
            fillDecreasePerHour: 7 +(2*difficultyLevel),
            fillIncreasePerFeed: 25,
            foodConsumed: 4,
        }
    }
}


class AlligatorHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 6000;
        this.initialCost = 8000;
        this.expansionInterval = 8000;
        this.expansionHousingIncrease = 3;
        this.baseQualityCost = 20000;
        this.qualityInterval = 20000;
        this.quantityPoints = 400;
        this.baseQuantityPoints = 400;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let alligatorHouse = new AlligatorHouse('alligator House');

buyAlligatorHousingButton.value = `Expand Housing: $${alligatorHouse.initialCost}`;
buyAlligatorQualityButton.value = `Upgrade Quality: $${alligatorHouse.baseQualityCost}`;

function buyAlligatorHousing () {
    alligatorHouse.buyExpansion()
    alligatorRatio.innerHTML = (`Number of Alligators: ${alligatorCount}/${alligatorHouse.maxHousing}`)
    buyAlligatorHousingButton.value = `Expand Housing: $${(alligatorHouse.expansionLevel+1) * alligatorHouse.expansionInterval}`;
}

function buyAlligatorQuality() {
    alligatorHouse.buyQuality();
    buyAlligatorQualityButton.value = `Upgrade Quality: $${(alligatorHouse.qualityLevel+1) * alligatorHouse.qualityInterval}`;
    alligatorQuality.innerHTML = `Housing Quality: ${alligatorHouse.qualityLevel}`;
}

function alligatorFeedSuper(n) {
    return function() {
        allAlligators[n-1].feed();
    }
}
function buyAlligatorFunction() {
    if (moneyCount >= alligatorHouse.animalCost && alligatorCount < alligatorHouse.maxHousing) {
        let a = new Alligator(alligatorCount+1);
        allAnimals.push(a);
        allAlligators.push(a);
        alligatorCount++;
        a.createHtml();
        let alligatorFeedListenerFunction = alligatorFeedSuper(a.num);
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://i.pinimg.com/originals/21/26/4b/21264b254fb27dc004778df9e250110b.jpg'
        let alligatorFeed =document.getElementById(`${a.species} ${a.num}`);
        alligatorFeed.addEventListener('click', alligatorFeedListenerFunction);
        alligatorRatio.innerHTML = (`Number of Alligators: ${alligatorCount}/${alligatorHouse.maxHousing}`);
        moneyCount -= alligatorHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyAlligatorHousingButton.addEventListener('click', buyAlligatorHousing);
buyAlligatorQualityButton.addEventListener('click', buyAlligatorQuality);
buyAlligatorButton.addEventListener('click', buyAlligatorFunction);

//elephants


class Elephant extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'elephant';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 5 + (2*difficultyLevel),
            fillIncreasePerFeed: 25,
            foodConsumed: 30,
        }
    }
}


class ElephantHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 50000;
        this.initialCost = 100000;
        this.expansionInterval = 50000;
        this.expansionHousingIncrease = 2;
        this.baseQualityCost = 75000;
        this.qualityInterval = 75000;
        this.quantityPoints = 4000;
        this.baseQuantityPoints = 4000;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let elephantHouse = new ElephantHouse('Elephant House');

buyElephantHousingButton.value = `Expand Housing: $${elephantHouse.initialCost}`;
buyElephantQualityButton.value = `Upgrade Quality: $${elephantHouse.baseQualityCost}`;

function buyElephantHousing () {
    elephantHouse.buyExpansion()
    elephantRatio.innerHTML = (`Number of Elephants: ${elephantCount}/${elephantHouse.maxHousing}`)
    buyElephantHousingButton.value = `Expand Housing: $${(elephantHouse.expansionLevel+1) * elephantHouse.expansionInterval}`;
}

function buyElephantQuality() {
    elephantHouse.buyQuality();
    buyElephantQualityButton.value = `Upgrade Quality: $${(elephantHouse.qualityLevel+1) * elephantHouse.qualityInterval}`;
    elephantQuality.innerHTML = `Housing Quality: ${elephantHouse.qualityLevel}`;
}

function elephantFeedSuper(n) {
    return function() {
        allElephants[n-1].feed();
    }
}
function buyElephantFunction() {
    if (moneyCount >= elephantHouse.animalCost && elephantCount < elephantHouse.maxHousing) {
        let a = new Elephant(elephantCount+1);
        allAnimals.push(a);
        allElephants.push(a);
        elephantCount++;
        a.createHtml();
        let elephantFeedListenerFunction = elephantFeedSuper(a.num);
        let tempPic = document.getElementById(`${a.species}${a.num}Pic`)
        tempPic.src = 'https://i.insider.com/5ba1184f2badb916ce5e28fc?width=1100&format=jpeg&auto=webp'
        let elephantFeed =document.getElementById(`${a.species} ${a.num}`);
        elephantFeed.addEventListener('click', elephantFeedListenerFunction);
        elephantRatio.innerHTML = (`Number of Elephants: ${elephantCount}/${elephantHouse.maxHousing}`);
        moneyCount -= elephantHouse.animalCost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyElephantHousingButton.addEventListener('click', buyElephantHousing);
buyElephantQualityButton.addEventListener('click', buyElephantQuality);
buyElephantButton.addEventListener('click', buyElephantFunction);


//final functions

//buy food functions
function buy5FoodFunction() {
    if (moneyCount >= buy5FoodCost) {
        moneyCount -= buy5FoodCost;
        money.innerHTML = `Money: $${moneyCount}`;
        foodCount += 5;
        currentFood.innerHTML = `Food: ${foodCount}`;  
    }
}
function buy50FoodFunction() {
    if (moneyCount >= buy50FoodCost) {
        moneyCount -= buy50FoodCost;
        money.innerHTML = `Money: $${moneyCount}`;
        foodCount += 50;
        currentFood.innerHTML = `Food: ${foodCount}`;  
    }
}

buy5FoodButton.addEventListener('click', buy5FoodFunction);
buy50FoodButton.addEventListener('click', buy50FoodFunction);

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
            buy5FoodCost = Math.floor(buy5FoodCost * 1 * Math.pow(1.1125, gameDayValue)) + 100;
            buy50FoodCost = buy5FoodCost * 10;
            buy5FoodButton.value = `Buy 5 Food $${buy5FoodCost}`;
            buy50FoodButton.value = `Buy 50 Food $${buy50FoodCost}`;
            martian.food.foodConsumed += 6 + (2*difficultyLevel);
            martianFeed.value = `Feed ${martian.food.foodConsumed}`;
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
            })
            allPandas.forEach(element => {
                if (element.alive === 0) {
                    deadPandaCount ++;
                    element.alive = 2;
                }
            })
            allAlligators.forEach(element => {
                if (element.alive === 0) {
                    deadAlligatorCount ++;
                    element.alive = 2;
                }
            })
            allElephants.forEach(element => {
                if (element.alive === 0) {
                    deadElephantCount ++;
                    element.alive = 2;
                }
            })
            if (gameDayValue === 6) {
                martian.food.fillDecreasePerHour = 10 + (3 * difficultyLevel);
                martianFeed.value = `Feed ${martian.food.foodConsumed}`;
            }
            if (gameDayValue === 9) {
                martian.food.fillDecreasePerHour = 20 + (10 * difficultyLevel);
                martianFeed.value = `Feed ${martian.food.foodConsumed}`;
            }
            if (gameDayValue === 10) {
                mainDiv.style.display = 'none';
                victoryScreen.style.visibility = 'visible';
                martian.food.fillDecreasePerHour = 0;
            }

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
    quantityPoints = martianQuantityPoints + (chimpanzeeCount - deadChimpanzeeCount) * chimpanzeeHouse.quantityPoints + (penguinCount - deadPenguinCount) * penguinHouse.quantityPoints +
     (tigerCount - deadTigerCount) * tigerHouse.quantityPoints + (pandaCount - deadPandaCount) * pandaHouse.quantityPoints +
     (alligatorCount - deadAlligatorCount) * alligatorHouse.quantityPoints + (elephantCount - deadElephantCount) * elephantHouse.quantityPoints;
    income = Math.floor(quantityPoints * varietyPoints);
    nextIncome.innerHTML = `Next Income: ${income}`;

}



function hungerAll() {
    allAnimals.forEach(animal => animal.hungerTick());
}
function checkMartian() {
    if (martian.alive === 0) {
        mainDiv.style.display = 'none';
        gameOver.style.visibility = 'visible';
    }
}

function hourTick() {
    clockTick();
    receiveIncome();
    updateIncome();
    hungerAll();
    checkMartian();
}


//define startGame
function setDifficulty() {
    if (difficulty.value === 'normal'){
        difficultyLevel = -1;
    }
    else {
        difficultyLevel = 0;
    }
}
speedVar = 10000;
function speedInt() {
    if (gameSpeed.value === 'slow') {
        return 12000
    }
    if (gameSpeed.value === 'medium') {
        return 8000;
    }
    if (gameSpeed.value === 'fast') {
        return 5000;
    }
    if (gameSpeed.value === 'veryFast') {
        return 2000;
    }
}
function startGame() {
    start.removeEventListener('click', startGame);
    setDifficulty();
    buyChimpanzeeFunction();
    updateIncome();
    setInterval(hourTick, speedInt());

}

start.addEventListener('click', startGame);
