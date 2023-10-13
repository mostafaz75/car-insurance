// var   ========================================

const form = document.querySelector("#request-quote");

// event   ======================================

document.addEventListener("DOMContentLoaded", afterload);
form.addEventListener("submit", submitForm);

// function   ===================================

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
    displayMsg("لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر");
  } else {
    console.log("pore");
    // console.log(insuranceCase(make,year,level.value))
  }
}

// function insuranceCase(inCarMake,inCarYear,inLevel) {
//   return{
//     carMake: inCarMake,
//     carYear: inCarYear,
//     carLevel: inLevel,
//   }
// }

// step 1: get info
let insuranceCase = {
  make: make,
  year: year,
  level: level,
};

// step2 :calculate
calculatePrice(insuranceCase);

// step3: show result message box

function calculatePrice(info) {
  let price = 0,
    base = 2000000;
  // calculate make
  /*
make:1 => 1.25
make:2 => 1.30
make:3 => 1.80

 */

  const make = info.make;
  switch (make) {
    case "1":
      price = base * 1.15;
      break;
    case "2":
      price = base * 1.3;
      break;
    case "3":
      price = base * 1.8;
      break;
  }
  // calculate year
  // get the year
  const year = info.year;
  // diffrence= getYearDiffrence(year)

  diffrence = function (year) {
    // Convert to number
    // get max year
    const now = new Date().toLocaleDateString("fa-IR");
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);
    year = max - year;
    return year;
  };

  // 3% cheaper for each year
  price = price - ((diffrence * 3) / 100) * price;
}

function afterload() {
  displayYears();
}
// user InterFace (UI ) Functions
// display message box
function displayMsg(msg) {
  // create message box
  const messageBox = document.createElement("div");
  messageBox.classList = "error";
  messageBox.innerText = msg;

  //show message
  form.insertBefore(messageBox, document.querySelector(".form-group"));

  timeOutError(2000, ".error");
}

// get time & element to remove element in that time
function timeOutError(time, element) {
  // remove message box
  setTimeout(() => {
    document.querySelector(element).remove();
  }, time);
}

// display years in optionsTage
function displayYears() {
  // get now date
  let curentYears = new Date().toLocaleDateString("fa-IR");

  // slice the year
  curentYears = curentYears.slice(0, 4);
  // max year
  let maxYear = fixNumbers(curentYears);
  const selectYears = document.querySelector("#year");

  const optionTag = document.createElement("option");
  optionTag.innerText = `   انتخاب`;

  optionTag.value = "";

  selectYears.appendChild(optionTag);
  // mine year
  let minYear = maxYear - 20;
  for (let i = maxYear; i >= minYear; i--) {
    const optionTag = document.createElement("option");
    optionTag.value = i;

    optionTag.innerText = `سال ${i}`;
    selectYears.appendChild(optionTag);
  }
}

// give us the years in persian number 
function fixNumbers(str) {
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
  ];
  let arabicNumbers = [
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
  ];

  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
    return parseInt(str);
  }
}
