'use strict';

const reqFields = document.getElementsByClassName("form-input");
const btnNext = document.querySelector(".btn-next");
const step1El = document.querySelector(".step-1-content");
const step2El = document.querySelector(".step-2-content");
const sidebar = document.querySelector(".sidebar");
const inputEmail = reqFields[1];
const inputPhone = reqFields[2];
const steps = document.getElementsByClassName("step-content");
const btnBackAll = document.getElementsByClassName("btn-back");
const btnNextAll = document.getElementsByClassName("btn-next");

///////////////////// STEP 1 //////////////////////////////

// Starting conditions

const init = function() {
  // Clear all input fields
  for (let i = 0; i < reqFields.length; i++) {
    reqFields[i].value = "";
  }
}

init();

// Email Input Validation
const validateEmail = function(mail) {
  // if entered text is ok
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    // remove potential warning message
    document.querySelector(".warning-email").classList.toggle("display-none");
    return true;
  }
  // if validation fails
  else {
    // Display the warning message
    document.querySelector(".warning-email").classList.remove("display-none");
    document.querySelector(".warning-email").textContent =
      "You have entered an invalid email address!";
    // Clear the field
    mail.value = "";
    return false;
  }
}

inputEmail.addEventListener("change", function (e) {
  e.preventDefault();
  validateEmail(inputEmail);
});

// Phone Number Validation
const validatePhone = function(number) {
  // If input is not a digit
  if (isNaN(number.value)) {
    // Display the warning message
    document.querySelector(".warning-phone").classList.remove("display-none");
    document.querySelector(".warning-phone").textContent =
      "You have entered an invalid phone number!";
    // Clear the field
    number.value = "";
    return false;
  }
  // If input is ok
  else {
    // Remove potential warning message
    document.querySelector(".warning-phone").classList.toggle("display-none");
    return true;
  }
}

inputPhone.addEventListener("change", function (e) {
  e.preventDefault();
  validatePhone(inputPhone);
});

////////////////// STEP 2: PLANS  //////////////////

// Toggle Button: switch between monthly and yearly plan data
const btnToggle = document.querySelector(".switch-toggle-button");
const monPlans = document.getElementsByClassName("plan-info-m");
const yearPlans = document.getElementsByClassName("plan-info-y");
const extraInfos = document.getElementsByClassName("plan-info-extra");

btnToggle.addEventListener("click", function () {
  for (let i = 0; i < 3; i++) {
    yearPlans[i].classList.toggle("display-none");
    extraInfos[i].classList.toggle("display-none");
    monPlans[i].classList.toggle("display-none");
  }
});

// Getting name and price from a selected plan;
const plans = document.getElementsByClassName("plan-option");

for (let i = 0; i < plans.length; i++) {
  // Click Event for Every Plan
  plans[i].addEventListener("click", function () {
    let planPrice;

    if (
      // getting yearly prices
      document.querySelector(".plan-info-m").classList.contains("display-none")
    ) {
      planPrice = plans[i].querySelectorAll(".plan-price")[1].textContent;
    } else {
      // getting monthly prices
      planPrice = plans[i].querySelectorAll(".plan-price")[0].textContent;
    }
    // getting title
    let planTitle = plans[i].querySelector(".tertiary-heading").textContent;
    

    //adding active class
    plans[i].classList.toggle("plan-option-active");

    // remove active class from no active buttons
    for(let j = 0; j < plans.length; j++){
      if(plans[j] !== plans[i]){
        plans[j].classList.remove("plan-option-active");
      }
    }

    // Clear price and title variable if plan does not contain active-class
    if(!plans[i].classList.contains("plan-option-active")){
      planPrice = "";
      planTitle = "";
    }
    updateSummaryPlans(planTitle, planPrice);
  }); // End of Click Event
} // End of first for loop

////////////////// STEP 3: ADD ONS //////////////////

const addOnAll = document.getElementsByClassName("add-ons-row");
let addOnTitle;
let addOnPrice;
for(let i = 0; i < addOnAll.length; i++){
  // Click Event for Every Add-On
  addOnAll[i].addEventListener("click", function(){
    addOnAll[i].classList.toggle("add-on-active");
    // We need price and title only of selected add-on/s
    if(addOnAll[i].classList.contains("add-on-active")){
      addOnTitle = addOnAll[i].querySelector(".tertiary-heading").textContent;
      // if add-on contains display-none => yearly prices (2 different paragraphs in HTML, add-ons-price-m and add-ons-price-y)
      if(addOnAll[i].lastElementChild.classList.contains("display-none")){
        addOnPrice = addOnAll[i].querySelector(".add-ons-price").textContent;
        // if add-on doesn't contain display-none => monthly prices
      } else {
        addOnPrice = addOnAll[i].querySelectorAll(".add-ons-price")[1].textContent;
      }
      updateSummaryAddons(addOnPrice, addOnTitle)
      // Add-on/s are not selected => need no data   
    } else {
      addOnTitle = "";
      addOnPrice = "";
    }  
    console.log(addOnPrice, addOnTitle)
  }) // End of Click Event
}

// monthly or yearly add-on prices depending on selected plan price in step 2
const updateAddOnPrices = function(){
  for(let i = 0; i < 3; i++){
    if (document.querySelectorAll(".plan-info-m")[i].classList.contains("display-none"))
     {
      document.querySelectorAll(".add-ons-price-m")[i].classList.add("display-none");
      document.querySelectorAll(".add-ons-price-y")[i].classList.remove("display-none");
    }
  }
} // will be called on step 2 with button next


////////////////// STEP 4 //////////////////

function updateSummaryPlans(planTitle, planPrice){
  const labelTitel = document.querySelector(".plan-title").textContent = planTitle;
  const labelPrice = document.querySelector(".plan-price-summary").textContent = planPrice;
}

function updateSummaryAddons(price, title){
  if(price !== ""){
    const html = `
  <div class="summary-bottom-row">
    <p class="add-on-description">${title}</p>
    <p class="add-on-price">${price}</p>
  </div>
`
const summaryContainer = document.querySelector(".summary-display-bottom");
summaryContainer.insertAdjacentHTML("afterbegin", html);
  }
}

////////////////// BUTTONS BACK, NEXT, CONFIRM //////////////////

const goBack = () => {
  for(let i = 0; i < steps.length; i++){
    if(!steps[i].classList.contains("display-none")){
      steps[i].classList.add("display-none")
      steps[i-1].classList.remove("display-none")
    } 
  }
}
// Click Event for Every Button Back
for(const btn of btnBackAll){
  btn.addEventListener("click", goBack);
}

// Button NEXT 1
btnNext.addEventListener("click", function (e) {
  // Prevent default form behaviour
  e.preventDefault();
  // No input field must be empty to proceed with button next
  if (reqFields[0].value !== "" &&
      reqFields[1].value !== "" &&
      reqFields[2].value !== ""
    ) {
    // Hide Step 1 and display Step 2
    step1El.classList.add("display-none");
    step2El.classList.remove("display-none");
  }
  // if there is an empty field, display a warning message
  else {
    for (let i = 0; i < reqFields.length; i++) {
      if (reqFields[i].value == "") {
        // Display warning message that is by default hidden
        reqFields[i].parentElement.firstElementChild.lastElementChild.classList.remove("display-none");
      } else {
        // Remove the warning message
        reqFields[i].parentElement.firstElementChild.lastElementChild.classList.add("display-none");
      }
    }
  }
});

// Button NEXT 2
const btnNext2 = document.getElementsByClassName("btn-next")[1];
btnNext2.addEventListener("click", () => {
  updateAddOnPrices();
  step2El.classList.add("display-none");
  steps[2].classList.remove("display-none");
})

// Button NEXT 3
const btnNext3 = document.getElementsByClassName("btn-next")[2];
btnNext3.addEventListener("click", () => {
  steps[2].classList.add("display-none");
  steps[3].classList.remove("display-none");
})

// Button CONFIRM
const btnConfirm = document.getElementsByClassName("btn-confirm")[0];
btnConfirm.addEventListener("click", () => {
  steps[3].classList.add("display-none");
  document.querySelector(".step-5").classList.remove("display-none");
})

// Button Change
const  btnChange = document.querySelector(".btn-change");
btnChange.addEventListener("click", () => {
  steps[3].classList.add("display-none");
  steps[1].classList.remove("display-none");
})