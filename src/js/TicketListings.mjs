import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("status");
// const navigation = `<li>${category}</i>`

document.querySelector("h1").innerText = category;
// document.querySelector("ul").appendChild = navigation

// // instantiate ExternalServices
// const dataSource = new ExternalServices(category);
// const element = document.querySelector(".product-list");
// const productList = new ProductList(category, dataSource, element);

// productList.init();