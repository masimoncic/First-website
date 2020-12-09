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

//make test function
function test() {
    let a = new Animal('a');
    console.log(a);
    console.log(a.food);
    a.hungerTick();
    console.log(a.food);
    a.feed();
    console.log(a.food);
}



class House {
    constructor(name, baseCost, initialCost, baseExpansionCost, expansionInterval, 
        baseQualityCost, qualityInterval, expansionHousingIncrease) {
        this.name = name;
        this.baseCost = baseCost;
        this.initialCost = initialCost;
        this.baseExpansionCost = baseExpansionCost;
        this.expansionInterval = expansionInterval;
        this.baseQualityCost = baseQualityCost;
        this.qualityInterval = qualityInterval;
        this.expansionHousingIncrease = expansionHousingIncrease;
        //predefined properties
        this.maxHousing = 0;
        this.CurrentHousingUsed = 0;
        this.expansionLevel = 0;
        this.qualityLevel = 0;
    }
}

    