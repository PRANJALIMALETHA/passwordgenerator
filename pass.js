const inputSlider=document.querySelector("[data-lengthslider]");
const lengthdisplay=document.querySelector("[data-lengthnumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password =" ";
let passwordLength = 10;

let checkcount=1;
//startingcolor to gray

handleSlider();

//pass word ki length ko set karega 
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthdisplay.innerText=passwordLength;

}


function setIndicator(color)
{
    indicator.style.backgroundColor=color;

}


function getrndInteger(min,max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function generaterandomno()
{
    return  getrndInteger(0,9); 
}

function generateLowercase()
{
    return String.fromCharCode(getrndInteger(97,123));
}

function generateuppercase()
{
    return String.fromCharCode(getrndInteger(65,91));
}

function generatesymbols()
{
    const random=getrndInteger(0,symbols.length);
    return symbols.charAt(random) ;
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}


async function  copycontent()
{
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

    
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copycontent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkcount == 0) 
        return;

    if(passwordLength < checkcount) {
        passwordLength = checkcount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateuppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(numbersCheck.checked)
        funcArr.push(generaterandomno);

    if(symbolsCheck.checked)
        funcArr.push(generatesymbols);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getrndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});


    function shufflePassword(array) {
        //Fisher Yates Method
        for (let i = array.length - 1; i > 0; i--) {
            //random J, find out using random function
            const j = Math.floor(Math.random() * (i + 1));
            //swap number at i index and j index
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }



// generateBtn.addEventListener('click', () => {
//     //none of the checkbox are selected

//     if(checkcount == 0) 
//         return;

//     if(passwordLength < checkcount) {
//         passwordLength = checkcount;
//         handleSlider();
//     }

//     // let's start the jouney to find new password
//     console.log("Starting the Journey");
//     //remove old password
//     password = "";
// })
function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    });
    if(passwordLength <checkcount)
    {
     passwordLength=checkcount;
     handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

