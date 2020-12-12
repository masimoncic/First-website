
class Elephant extends Animal {
    constructor(num) {
        super(num);
        this.alive = 1;
        this.species = 'elephant';
        this.name = `${this.species} ${this.num}`
        this.food = {
            maxFill: 100,
            currentFill: 80,
            fillDecreasePerHour: 5,
            fillIncreasePerFeed: 25,
            foodConsumed: 5,
        }
    }
}


class ElephantHouse extends House {
    constructor(name) {
        super(name);
        this.animalCost = 5000;
        this.initialCost = 5000;
        this.expansionInterval = 5000;
        this.expansionHousingIncrease = 4;
        this.baseQualityCost = 20000;
        this.qualityInterval = 20000;
        this.quantityPoints = 400;
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
        let a = new Elephant(ElephantCount+1);
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