
// var

const form = document.querySelector("#request-quote");



// event

document.addEventListener("DOMContentLoaded", afterload);
form.addEventListener("submit", submitForm);




// function


// submit form
function submitForm(e) {
  e.preventDefault();

  //   read value from form
  const make = document.querySelector("#make").value;
  const year = document.querySelector("#year").value;
  const level = document.querySelector("input[name=level]:checked");

  //   Validation
  if (make === "" || year === "" || level === "") {
    console.log("khalei");
    displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
  } else {
    console.log("pore");
  }
}

function afterload() {
  displayYears();
}
// user InterFace (UI ) Functions
// display message box
function displayMsg(msg) {
  // create message box
  const messageBox = document.createElement('div');
  messageBox.classList = 'error'
  messageBox.innerText=  msg


  //show message
  form.insertBefore(messageBox,document.querySelector(".form-group")) 

  // remove message box
  setTimeout(() => {
    document.querySelector(".error").remove()
  }, 5000);
}

function displayYears() {
  let persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function (str) {
      if (typeof str === "string") {
        for (let i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
        return parseInt(str);
      }
    };
  // get now date
  let curentYears = new Date().toLocaleDateString("fa-IR");

  // slice the year
  curentYears = curentYears.slice(0, 4);
  // max year
  let maxYear = fixNumbers(curentYears);

  // mine year
  let minYear = maxYear - 20;

  const selectYears = document.querySelector("#year");

  const optionTag = document.createElement("option");
  optionTag.innerText = `   انتخاب`;

  optionTag.value = "";

  selectYears.appendChild(optionTag);

  for (let i = maxYear; i >= minYear; i--) {
    const optionTag = document.createElement("option");
    optionTag.value = i;

    optionTag.innerText = `سال ${i}`;
    selectYears.appendChild(optionTag);
  }
}
