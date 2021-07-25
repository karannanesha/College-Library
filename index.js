console.log("Welcome to Library");

// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Comstructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  // console.log("Adding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                  <td>${book.name}</td>
                  <td>${book.author}</td>
                  <td>${book.type}</td>
                 </tr>`;
  tableBody.innerHTML += uiString;
};

// Implementing the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// Implementing the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 3) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                         <strong>Message : </strong>${displayMessage}
                         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                       </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 3000);
};

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  // console.log("You have submitted the library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let horror = document.getElementById("horror");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (horror.checked) {
    type = horror.value;
  }

  let book = new Book(name, author, type);
  // console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully added.");
  } else {
    // show error to the user
    display.show("danger", "Sorry you cannot add this book.");
  }

  e.preventDefault();
}
