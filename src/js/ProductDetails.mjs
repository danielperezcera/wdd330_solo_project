import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail">
                <h3>${product.Brand.Name}</h3>

                <h2 class="divider">${product.NameWithoutBrand}</h2>

                <img
                  class="divider"
                  src="${product.Images.PrimaryLarge}"
                  alt="${product.NameWithoutBrand}"
                />

                <p class="product-card__price">$${product.FinalPrice}</p>

                <p class="product__color">${product.Colors[0].ColorName}</p>

                <p class="product__description">
                  ${product.DescriptionHtmlSimple}
                </p>

                <div class="product-detail__add">
                  <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
                </div>
              </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");
    this.renderTitle();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
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
        // just in case we are using an old saved localstorage list
        // it adds the quantity property
        if (!cartItem.quantity) {
          cartItem.quantity = 1;
        }

        // If we already have one with the same id, add to it
        if (cartItem.Id === this.product.Id) {
          alreadyExists = true;
          cartItem.quantity++;
          alertMessage(`${this.product.Name} was added to the cart!`);
        }
      });
    }
    // don't want to mutate an array while traversing it
    // if the item doesn't exist yet...
    if (!alreadyExists) {
      // create a temp newCartItem
      const newCartItem = this.product;
      // add the quantity property to it and assign a value of 1
      newCartItem.quantity = 1;
      cart.push(newCartItem);
      alertMessage(`${this.product.Name} was added to the cart!`);
    }

    // console.log(cart);
    setLocalStorage("so-cart", cart);

    // alert("Item added!");
    // if (query) {
    //   console.log(query);
    //   let data_clear = "";

    //   query.forEach((item) => (data_clear += JSON.stringify(item) + ","));

    //   let data = data_clear + JSON.stringify(this.product);

    //   localStorage.setItem("so-cart", "[" + data + "]");
    // } else {
    //   setLocalStorage("so-cart", this.product);
    // }
  }

  renderTitle() {
    const element = document.querySelector("title");
    element.textContent = "Sleep Outside | " + this.product.Name;
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}
