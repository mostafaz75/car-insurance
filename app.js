// var   ========================================

const form = document.querySelector("#request-quote");

// Prices and numbers are inside this variable
const priceNumber= {
  //Coefficient of pride
  make1: 1.15,
  //Coefficient of optima
  make2: 1.30,
  //Coefficient of Porsche
  make3: 1.80,
  // base price for clalculate Insurance
  base : 2000000,
  // price before start proccessing
  price : 0

}
// event   ======================================

document.addEventListener("DOMContentLoaded", afterload);
document.addEventListener("submit", submitForm);

// function   ===================================
function afterload() {
  displayYears();
}
// submit form
function submitForm(e) {
  e.preventDefault();

  // read value from the form
  const make = document.querySelector('#make').value
  const year = document.querySelector('#year').value
  const level = document.querySelector('input[name="level"]:checked').value

  // check the value of fileds are correct
  if (make === "" || year === "" || level === "") {
      displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
  } else {
      // STEP1: get info
      let insuranceCase = {
          make: make,
          year: year,
          level: level
      }

      // STEP2: calculate
      calculatePrice(insuranceCase)

      
  }
}


function calculatePrice(info) {
  let 
// + Calculate Make 
  

    const make = info.make
    switch (make) {
        case "1":
            price = base * priceNumber.make1
            break;
        case "2":
            price = base * priceNumber.make2
            break;
        case "3":
            price = base * priceNumber.make3
            break;
    }


  
    // + Calculate Year
    // get the year
    const year = info.year
    // diffrence = getYearDiffrence(year)
    const diffrence = function (year) {
        // Convert to number
        let
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
            fixNumbers = function (str) {
                if (typeof str === 'string') {
                    for (var i = 0; i < 10; i++) {
                        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                    }
                }
                return parseInt(str);
            };

        // get max year
        const now = new Date().toLocaleDateString('fa-IR')
        let nowYear = now.slice(0, 4)
        let max = fixNumbers(nowYear)
        year = max - year

        return year
    }

  // 3% cheaper for each year
  price = price - ((diffrence(year) * 3) / 100) * price
  console.log(price);


    // + get the level
    const level = info.level
    price = calculateLevel(level , price)
}

function calculateLevel(level , price){
    /*
        basic   =>  increase 30%
        complete=>  increase 50%
    */

    if (level == 'basic'){
        // price = price + (price * 0.30) (bara mehrdad)
        price = price * 1.3
    }else{
        price = price * 1.5
    }

    return price
}




// user InterFace (UI ) Functions
// display message box
function displayMsg(msg) {


  // create message box
  const messageBox = document.createElement("div");
  messageBox.classList = "error";
  messageBox.innerText = msg;

  // this function use for where error message show  
  insertBeforeorAfter(form,messageBox,".form-group")

  // get time of disapear and in the element that we want to disapear 
  timeOutError(2000, ".error");
}

// get element and the class of it and show where our message displayed
function insertBeforeorAfter(kindOfElement,beforeOrAfterElment,selectelement){
  kindOfElement.insertBefore(beforeOrAfterElment, document.querySelector(selectelement));

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


 // craet options for kind of car  that coustemer should select
  createOption (selectYears, `   انتخاب`,"",false)

  // mine year
  let minYear = maxYear - 20;


  for (let i = maxYear; i >= minYear; i--) {
    // craet options for years that coustemer should select
    createOption (selectYears, `سال ${i}`,i,false)
  }
}


// make options get text value and where append the element 
function createOption (selectelement, text,value,seleced){
  const optionTag = document.createElement("option")
  optionTag.innerText=text
  optionTag.value=value 
  if (seleced){
    optionTag.selected=true;
  }
  selectelement.appendChild(optionTag)
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
