import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  //constructor(key, outputSelector) {
  constructor(key) {
    this.key = key;
    this.list = [];
    //this.outputSelector = outputSelector;
    this.itemsQ = 0;
    this.subtotalPrice = 0;
    this.shippingPrice = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemsQ = this.list.length;
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    let subtotal = 0;
    this.list.forEach((item) => {
      subtotal += item.FinalPrice;
    });

    this.subtotalPrice = subtotal;

    if (this.itemsQ == 1) {
      this.shippingPrice = 10;
    } else if (this.itemsQ > 1) {
      this.shippingPrice = 10 + (this.itemsQ - 1) * 2;
    }

    this.tax = this.subtotalPrice * 0.06;

    this.orderTotal = this.subtotalPrice + this.tax + this.shippingPrice;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.getElementById("quantity").textContent = this.itemsQ;
    document.getElementById("subtotal").textContent =
      "$" + this.subtotalPrice.toFixed(2);
    document.getElementById("shipping").textContent =
      "$" + this.shippingPrice.toFixed(2);
    document.getElementById("tax").textContent = "$" + this.tax.toFixed(2);
    document.getElementById("ordertotal").textContent =
      "$" + this.orderTotal.toFixed(2);
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shippingPrice;
    json.items = packageItems(this.list);
    // console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log(err);

      for (let message in err.message) {
        console.log(err.message[message]);
        alertMessage(err.message[message]);
      }
    }
  }
}
