const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: []
}


// item = {name: name, price: price}
function addItem (item) {
  cart.push[item];
}

function tax () {
  for (let item in user.cart) {
    item.price *= 1.03
  }
}

function buy (item) {
  for (let match in user.cart) {
    if (item.name === match.name) {
      cart.splice(item, 1);
      purchases.push(item);
    }
  }
}

function emptyCart()  {
  user.cart = [];
}