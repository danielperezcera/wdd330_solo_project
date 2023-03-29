import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// const ticketList = new TicketList;

// const handleTicket = ()=>{
//   const ticket = new Ticket();

// }
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

  // handleTicket(e.target.area.value, e.target.description.value, e.target.contact.value);

  console.log(form.area.value);
});
