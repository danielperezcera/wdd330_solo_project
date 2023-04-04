import { getParam, loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

//Get paramater from URL query
const category = getParam("status");

//Indicator of which page is rendered
document.querySelector("h1").innerText = category;

//What happens when the status is changed for each ticket
function changeStatus(id) {
  //Every ticket's ID is an "S" with a number corresponding to it.
  // Here we take only the number, as it corresponds to the array index
  let listIndex = id.substring(1);

  //Get the list from local storage
  let list = getLocalStorage("ticket-list");

  //Get the value from the status <select> ticket whose ID matches
  const newStatus = document.querySelector(`#${id}`).value;

  //Change the ticket's status for the newly selected one
  list[listIndex].status = newStatus;

  //Update the local stored ticket list
  setLocalStorage("ticket-list", list);

  //refresh the UI
  document.querySelector("ul").innerHTML = null;

  //re-render with new list
  renderTicketList();
}

//Ticket template
function TicketTemplate(ticket, index) {
  return `
  <li class="ticket-card">
    <h3>Ticket No.${index}</h3>
      <div>
        <p><b>Area:</b>  ${ticket.area}</p>
        <p><b>Description:</b>  ${ticket.description}</p>
        <p><b>Contact:</b>  ${ticket.contact}</p>
        <p><b>Current Status:</b>  ${ticket.status}</p>
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

//Render the ticket list items in a UL
function renderTicketList() {
  //Select the UL where everything will be appended
  let listUl = document.querySelector(".ticketListUl");

  //retrieve latest version of the list from local storage
  let list = getLocalStorage("ticket-list");

  //Iterate through the list and create each ticket
  list.map((item, index) => {
    if (item.status.toUpperCase() === category.toUpperCase()) {
      listUl.insertAdjacentHTML("beforeend", TicketTemplate(item, index));
    }
  });

  //Select all <select>s
  const selects = document.querySelectorAll("select");

  //Add event listener to each, for status change purposes
  selects.forEach((select) => {
    select.addEventListener("change", () => {
      changeStatus(select.id);
    });
  });
}

//Render the list
renderTicketList();
