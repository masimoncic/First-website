class Alligator extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'alligator';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 2,
            fillIncreasePerFeed: 30,
            foodConsumed: 4,
        }
    }
}


class AlligatorHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 10000;
        this.initialCost = 10000;
        this.expansionInterval = 5000;
        this.expansionHousingIncrease = 2;
        this.baseQualityCost = 10000;
        this.qualityInterval = 10000;
        this.quantityPoints = 200;
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
        
}


let alligatorHouse = new AlligatorHouse('alligator House');

buyAlligatorHousingButton.value = `Expand Housing: $${alligatorHouse.initialCost}`;
buyAlligatorQualityButton.value = `Upgrade Quality: $${aligatorHouse.baseQualityCost}`;

function buyAlligatorHousing () {
    alligatorHouse.buyExpansion()
    alligatorRatio.innerHTML = (`Number of Alligators: ${alligatorCount}/${alligatorHouse.maxHousing}`)
    buyAlligatorHousingButton.value = `Expand Housing: $${(alligatorHouse.expansionLevel+1) * AlligatorHouse.expansionInterval}`;
}

function buyAlligatorQuality() {
    alligatorHouse.buyQuality();
    buyAlligatorQualityButton.value = `Upgrade Quality: $${(alligatorHouse.qualityLevel+1) * AlligatorHouse.qualityInterval}`;
    alligatorQuality.innerHTML = `Housing Quality: ${alligatorHouse.qualityLevel}`;
}

function alligatorFeedSuper(n) {
    return function() {
        allAlligators[n-1].feed();
    }
}
function buyAlligatorFunction() {
    if (moneyCount >= alligatorHouse.animalCost && AlligatorCount < alligatorHouse.maxHousing) {
        let a = new Alligator(AlligatorCount+1);
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
