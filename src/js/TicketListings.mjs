import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

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

function changeStatus(id) {
  let listIndex = id.substring(1);
  let list = getLocalStorage("ticket-list");
  const newStatus = document.querySelector(`#${id}`).value;
  // console.log("New Status is: ", newStatus);
  // console.log("before", list);
  list[listIndex].status = newStatus;
  // console.log("status: ", list[listIndex].status);
  // console.log("after", list);
  // console.log(newStatus);
  // console.log("made it here! ID: ", id);
  setLocalStorage("ticket-list", list);
  document.querySelector("ul").innerHTML = null;
  renderTicketList();
}

function TicketTemplate(ticket, index) {
  return `
  <li class="ticket-card">
    <h3>Ticket No.${index}</h3>
      <div>
        <p>Area:${ticket.area}</p>
        <p>Description:${ticket.description}</p>
        <p>Contact:${ticket.contact}</p>
        <p>Current Status:${ticket.status}</p>
        <select id="s${index}" >

          <option value="${ticket.status}" selected>${ticket.status}</option>
          <option value="new">new</option>
          <option value="in-progress">in-progress</option>
          <option value="on-hold">on-hold</option>
          <option value="completed">completed</option>

        </select>
      </div>
  </li>`;
}

function renderTicketList() {
  let listUl = document.querySelector(".ticketListUl");

  let list = getLocalStorage("ticket-list");

  list.map((item, index) => {
    if (item.status.toUpperCase() === category.toUpperCase()) {
      listUl.insertAdjacentHTML("beforeend", TicketTemplate(item, index));
    }
  });

  const selects = document.querySelectorAll("select");

  selects.forEach((select) => {
    select.addEventListener("change", () => {
      changeStatus(select.id);
    });
  });
}

renderTicketList();
