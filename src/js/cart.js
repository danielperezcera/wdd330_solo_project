import ShoppingCart from "./ShoppingCart";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

let shoppingCart = new ShoppingCart("so-cart",".product-list");

shoppingCart.renderCartContents();
