createHtml () {
    let animalDiv = document.createElement('div');
    animalDiv.id = `${this.species} ${this.num} div`;
    animalFoodDiv.appendChild(animalDiv);
    animalDiv.className = 'animalObject'
    //pic instead of text
    //let animalPic = document.createElement('img');
    //animalPic.src = './Pictures/${this.species}.jpeg';
    //animalPic.className = 'animalPic';
    //animalDiv.appendChild(animalPic);
    //image source: https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-15bnj6w_1851a868.jpeg
    //text instead of pic
    let animalP = document.createElement('p');
    animalP.innerHTML = `${this.species} ${this.num}`;
    animalP.className = `$animalObjectName`;
    animalDiv.appendChild(animalP);
    let animalFood = document.createElement('p');
    animalFood.innerHTML = `${this.food.currentFill}/${this.food.maxFill}`;
    animalFood.id = `${this.species} ${this.num} food`;
    animalFood.className = `$animalFoodMeter`
    animalDiv.appendChild(animalFood);
    let animalFeed = document.createElement('input');
    animalFeed.type='submit';
    animalFeed.value=`Feed ${this.food.foodConsumed}`
    animalFeed.id = `animal ${this.num}`;
    animalFeed.className = 'animalFeedButton';
    animalDiv.appendChild(animalFeed);

}

let animalFeedListenerFunction = animalFeedSuper(this.num);
animalFeed.addEventListener('click', animalFeedListenerFunction);