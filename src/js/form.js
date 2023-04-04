import { getLocalStorage, setLocalStorage } from "./utils.mjs";

class Ticket {
  constructor(area, description, contact) {
    this.area = area;
    this.description = description;
    this.contact = contact;
  }
}

class TicketList {
  constructor() {
    this.list = [];
  }

  addTicket = (ticket) => {
    this.list.push(ticket);
  };
}

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("form");

  const ticket = {
    area: form.area.value,
    description: form.description.value,
    contact: form.contact.value,
    status: "New",
  };

  console.log(ticket);

  let ticketList = getLocalStorage("ticket-list");

  if (!ticketList) {
    ticketList = [];
    ticketList.push(ticket);
    setLocalStorage("ticket-list", ticketList);
  } else if (ticketList) {
    ticketList.push(ticket);
    setLocalStorage("ticket-list", ticketList);
  }

  //resetting form
  form.area.value = "";
  form.description.value = "";
  form.contact.value = "";

  //closing the modal function declaration
  const close = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  //executing the function
  close();
});
