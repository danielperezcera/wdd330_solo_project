// imports
import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// const element = document.querySelector("#new");

// const funcion = () => {
//   window.location = "product-listing/index.html";
// };

// element.addEventListener("click", funcion);
// instantiate ProductData
// const dataSource = new ProductData("tents");
// const element = document.querySelector(".product-list");
// const productList = new ProductList("tents", dataSource, element);

// productList.init()
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the element that closes the modal
var span = document.querySelector("#cancel");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//
