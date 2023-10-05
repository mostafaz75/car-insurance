function displayYears(){

    let
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],

    fixNumbers = function (str){
        if(typeof str === 'string'){
            for(let i=0; i<10 ; i++){
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
        return parseInt(str)
    }
    }
    // get now date
    let curentYears= new Date().toLocaleDateString("fa-IR");

    // slice the year
    curentYears= curentYears.slice(0,4)
    // max year
    let maxYear = fixNumbers(curentYears)
    console.log(maxYear)
    // mine year
    let minYear = maxYear - 20
    console.log(minYear);


   const selectYears=document.querySelector('#year')
   

   for(let i= maxYear; i>= minYear;i--){
    const optionTag=document.createElement("option")
    optionTag.value= i
    optionTag.innerText=`سال ${i}` 
    selectYears.appendChild(optionTag)
    console.log(optionTag)
   }
   
  
    
}
displayYears()