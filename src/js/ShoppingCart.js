import { setLocalStorage ,getLocalStorage, alertMessage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.itemsQ = 0;
    this.subtotalPrice = 0;
    this.shippingPrice = 0;
    this.tax = 0;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems) {
      document.querySelector(this.parentSelector).innerHTML = `
      <h1>Nothing to see here! Add something to the cart first</h1>
      `;
      console.log("Empty Cart!");
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));

      document.querySelector(this.parentSelector).innerHTML =
        htmlItems.join("");
      
        let minus = document.querySelectorAll('.minus');
        minus.forEach((element) => {
          element.addEventListener('click', (item) =>{
              modifyQuantity(item.target.parentElement.id,'subtract');
          });
        });

        let plus = document.querySelectorAll('.plus');
        plus.forEach((element) => {
          element.addEventListener('click', (item) =>{
            modifyQuantity(item.target.parentElement.id,'sum');
          });
        });
    }
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity" id="${item.Id}">qty: <button type="button" class="sm-btn minus">-</button> <span class="qty${item.Id}">${item.quantity}</span> <button type="button" class="sm-btn plus">+</button></p>
    <p class="cart-card__price">$${item.FinalPrice * item.quantity}</p>
  </li>`;

  return newItem;
}

function modifyQuantity(productId,option) {
  // const query = getLocalStorage("so-cart");
  let cart = getLocalStorage("so-cart");

  if (!cart) {
    cart = [];
  }

  // if it exists, only add to its quantity
  // else we need to push it into the array after the check
  let alreadyExists = false;

  if (cart) {
    // for each, check if the cartItem id is already present
    cart.forEach((cartItem) => {
      
      // If we already have one with the same id, add to it
      if (cartItem.Id === productId) {
        alreadyExists = true;

        if(option == "sum"){
          cartItem.quantity++;
          alertMessage(`Added to the cart!`);
        }else if(option == "subtract" && cartItem.quantity > 0){
          cartItem.quantity--;
          alertMessage(`Subtracted from the cart!`);
        }
        setLocalStorage("so-cart", cart);
        
        const newQty = cartItem.quantity;

        const elem = document.querySelector(".qty"+productId);
        elem.textContent = newQty;
        const newTotal = "$" + (cartItem.FinalPrice * newQty);
        elem.parentElement.nextSibling.nextSibling.textContent = newTotal;
      }
    });
  }
  

  
}
