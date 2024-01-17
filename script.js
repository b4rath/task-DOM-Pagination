// Get the table element
const table = document.querySelector(".table");

// Get the table body element
const tbody = document.querySelector("#t-body");

// Get the pagination buttons
const buttons = document.querySelectorAll("#ul-list li button");

// Get the previous and next buttons
const prevBtn = document.querySelector("#event-btn-pre");
const nextBtn = document.querySelector("#event-btn-next");

// Get the first and last buttons
const firstBtn = document.querySelector("#event-btn-first");
const lastBtn = document.querySelector("#event-btn-last");

// Define the number of items per page
const itemsPerPage = 10;

// Define the current page number
let currentPage = 1;

// Define the total number of pages
let totalPages = 0;

// Define the data array
let data = [];

// Define a function to fetch the data from a JSON file
function fetchData() {
  // Use the fetch API to get the data
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      // Assign the data to the data array
      data = json;

      // Calculate the total number of pages
      totalPages = Math.ceil(data.length / itemsPerPage);

      // Display the first page of data
      displayPage(1);
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
}

// display a page of data
function displayPage(page) {
  // Clear the table body
  tbody.innerHTML = "";

  // data array from the start index to the end index
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = page * itemsPerPage;
  for (let i = startIndex; i < endIndex; i++) {
    // the data exists at the current index
    if (data[i]) {
      // table row element
      let tr = document.createElement("tr");

      // table cell element for the id
      let tdId = document.createElement("td");
      tdId.textContent = data[i].id;

      // table cell element for the name
      let tdName = document.createElement("td");
      tdName.textContent = data[i].name;

      // table cell element for the email
      let tdEmail = document.createElement("td");
      tdEmail.textContent = data[i].email;

      // table cells to the table row
      tr.appendChild(tdId);
      tr.appendChild(tdName);
      tr.appendChild(tdEmail);

      // table row to the table body
      tbody.appendChild(tr);
    }
  }

  // the current page number
  currentPage = page;

  // the active button
  updateActiveButton();

  // the previous and next buttons
  updatePrevNextButtons();

  // the first and last buttons
  updateFirstLastButtons();
}

// update the active button
function updateActiveButton() {
  // Loop through the buttons
  for (let button of buttons) {
    // the button value matches the current page number
    if (button.textContent == currentPage) {
      // the active class to the button
      button.classList.add("active");
    } else {
      // the active class from the button
      button.classList.remove("active");
    }
  }
}

// update the previous and next buttons
function updatePrevNextButtons() {
  // the current page is the first page
  if (currentPage == 1) {
    // the previous button
    prevBtn.disabled = true;
  } else {
    // the previous button
    prevBtn.disabled = false;
  }

  // current page is the last page
  if (currentPage == totalPages) {
    // the next button
    nextBtn.disabled = true;
  } else {
    // Enable the next button
    nextBtn.disabled = false;
  }
}

// the first and last buttons
function updateFirstLastButtons() {
  // the current page is the first page
  if (currentPage == 1) {
    // the first button
    firstBtn.disabled = true;
  } else {
    // the first button
    firstBtn.disabled = false;
  }

  // the current page is the last page
  if (currentPage == totalPages) {
    // the last button
    lastBtn.disabled = true;
  } else {
    // the last button
    lastBtn.disabled = false;
  }
}

// handle the click event on a button
function handleClick(event) {
  // the button that was clicked
  let button = event.target;

  // the button value
  let value = button.textContent;

  // the value is a number
  if (!isNaN(value)) {
    // the value to a number
    value = Number(value);

    // the page of data corresponding to the value
    displayPage(value);
  } else {
    // the value is "Previous"
    if (value == "⏪Previous") {
      // the previous page of data
      displayPage(currentPage - 1);
    }

    // the value is "Next"
    if (value == "Next⏩") {
      // the next page of data
      displayPage(currentPage + 1);
    }

    // the value is "First"
    if (value == "First") {
      // the first page of data
      displayPage(1);
    }

    // if the value is "Last"
    if (value == "Last") {
      // the last page of data
      displayPage(totalPages);
    }
  }
}

// click event listener to each button
for (let button of buttons) {
  button.addEventListener("click", handleClick);
}

//  page loads
fetchData();
