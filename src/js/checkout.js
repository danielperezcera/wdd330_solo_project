import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

//let CheckoutProcess = new CheckoutProcess("so-cart",".product-list");
let CheckoutTotal = new CheckoutProcess("so-cart");

CheckoutTotal.init();

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    CheckoutTotal.calculateOrdertotal.bind(CheckoutTotal)
  );
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  // CheckoutTotal.checkout();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) CheckoutTotal.checkout();
});

loadHeaderFooter();
