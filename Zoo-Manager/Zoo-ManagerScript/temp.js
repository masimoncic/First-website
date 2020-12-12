class Penguin extends Animal {
    constructor(num) {
        super(num);
        this.species = 'penguin';
        this.name = `${this.species} ${this.num}`
        this.cost = 200;
        this.food = {
            maxFill: 100,
            currentFill: 50,
            fillDecreasePerHour: 1,
            fillIncreasePerFeed: 20,
            foodConsumed: 1,
        }
    }
}


class PenguinHouse extends House {
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


let penguinHouse = new PenguinHouse('Penguin House');

buyPenguinHousingButton.value = `Expand Housing: $${(PenguinHouse.expansionLevel+1) * PenguinHouse.expansionInterval}`;
buyPenguinQualityButton.value = `Upgrade Quality: $${PenguinHouse.baseQualityCost}`;

function buyPenguinHousing () {
    PenguinHouse.buyExpansion()
    PenguinRatio.innerHTML = (`Number of Penguins: ${penguinCount}/${PenguinHouse.maxHousing}`)
    buyPenguinHousingButton.value = `Expand Housing: $${(PenguinHouse.expansionLevel+1) * PenguinHouse.expansionInterval}`;
}

function buyPenguinQuality() {
    PenguinHouse.buyQuality();
    buyPenguinQualityButton.value = `Upgrade Quality: $${(PenguinHouse.qualityLevel+1) * PenguinHouse.qualityInterval}`;
    penguinQuality.innerHTML = `Housing Quality: ${PenguinHouse.qualityLevel}`;
}

function PenguinFeedSuper(n) {
    return function() {
        allPenguins[n-1].feed();
    }
}
function buyPenguinFunction() {
    if (moneyCount >= 200 && penguinCount < PenguinHouse.maxHousing) {
        let a = new Penguin(penguinCount+1);
        allAnimals.push(a);
        allPenguins.push(a);
        penguinCount++;
        a.createHtml();
        let PenguinFeedListenerFunction = PenguinFeedSuper(a.num);
        let penguinFeed =document.getElementById(`animal ${a.num}`);
        penguinFeed.addEventListener('click', PenguinFeedListenerFunction);
        penguinRatio.innerHTML = (`Number of Penguins: ${penguinCount}/${PenguinHouse.maxHousing}`);
        moneyCount -= a.cost;
        money.innerHTML = `Money: $${moneyCount}`;
    }
}

//add event listeners
buyPenguinHousingButton.addEventListener('click', buyPenguinHousing);
buyPenguinQualityButton.addEventListener('click', buyPenguinQuality);
buyPenguinButton.addEventListener('click', buyPenguinFunction);


