// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get parameters from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // const htmlStringsFiltered = htmlStrings.slice(0, 4);
  //Clear the inner contents of the HTML element
  if (clear === false) {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  } else {
    parentElement.innerHTML = htmlStrings.join("");
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  return await fetch(path).then((response) => response.text());
}
// We believe this is the same as ^^^^
// async function loadTemplate(path) {
//   const res = await fetch(path);
//   const template = await res.text();
//   return template;
// }

export async function loadHeaderFooter() {
  //TODO: change paths back to exclude public
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  const closingButton = document.createElement("span");
  closingButton.textContent = " X";
  closingButton.classList.add("closing");
  // console.log("message: ", message);
  alert.innerHTML = `<p>${message} </p>`;
  // console.log("innerHTML", alert.innerHTML);
  alert.appendChild(closingButton);
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
