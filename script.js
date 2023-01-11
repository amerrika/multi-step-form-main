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

function init() {
  // Clear all input fields
  for (let i = 0; i < reqFields.length; i++) {
    reqFields[i].value = "";
  }
}

init();

// Email Input Validation
function validateEmail(mail) {
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
function validatePhone(number) {
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

////////////////// STEP 2 //////////////////////////////////////

// Toggle Button Operation: switch between monthly and yearly plan data
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
const planOptions = document.getElementsByClassName("plan-option");
let planPrice;
let planTitle;

for (let i = 0; i < planOptions.length; i++) {
  // Plan Button Operation
  planOptions[i].addEventListener("click", function () {
    // yearly prices
    if (
      document.querySelector(".plan-info-m").classList.contains("display-none")
    ) {
      planPrice = parseInt(
        planOptions[i].querySelectorAll(".plan-price")[1].textContent
      );
    } else {
      // monthly prices
      planPrice = parseInt(
        planOptions[i].querySelectorAll(".plan-price")[0].textContent
      );
    }
    // getting title
    planTitle = planOptions[i].querySelector(".tertiary-heading").textContent;

    //adding active class
    planOptions[i].classList.toggle("plan-option-active");

    // remove active class from no active buttons
    for(let j = 0; j < planOptions.length; j++){
      if(planOptions[j] !== planOptions[i]){
        planOptions[j].classList.remove("plan-option-active");
      }
    }

    // Clear price and title variable if plan does not contain active-class
    if(!planOptions[i].classList.contains("plan-option-active")){
      planPrice = "";
      planTitle = "";
    }
    console.log(planTitle, planPrice)
  }); // End of Event
} // End of first for loop

/////////////////////////// STEP 3 ////////////////////////////////////
const addOnAll = document.getElementsByClassName("add-ons-row");
let addOnTitle;
let addOnPrice;

for(let i = 0; i < addOnAll.length; i++){
  addOnAll[i].addEventListener("click", function(){
    addOnAll[i].classList.toggle("add-on-active");
      if(addOnAll[i].classList.contains("add-on-active")){
      addOnTitle = addOnAll[i].querySelector(".tertiary-heading").textContent;
      addOnPrice = addOnAll[i].querySelector(".add-ons-price").textContent;
      } else {
        addOnTitle = "";
        addOnPrice = "";
      }
  })
}

/////////////////// BUTTON NEXT, BUTTON BACK, BUTTON CONFIRM /////////////////////

// Button Back Function
const goBack = () => {
  for(let i = 0; i < steps.length; i++){
    if(!steps[i].classList.contains("display-none")){
      console.log(i)
      steps[i].classList.add("display-none")
      steps[i-1].classList.remove("display-none")
    } 
  }
}

// All Button BACK click event;
for(const btn of btnBackAll){
  btn.addEventListener("click", goBack);
}

// Button NEXT 1
btnNext.addEventListener("click", function (e) {
  // Prevent default form behaviour
  e.preventDefault();
  // No input field must be empty to proceed with button next
  if (
    reqFields[0].value !== "" &&
    reqFields[1].value !== "" &&
    reqFields[2].value !== ""
  ) {
    // Hide Step 1
    step1El.classList.add("display-none");
    // Display Step 2
    step2El.classList.remove("display-none");
  }
  // if there is an empty field, display a warning message
  else {
    for (let i = 0; i < reqFields.length; i++) {
      if (reqFields[i].value == "") {
        reqFields[
          i
        ].parentElement.firstElementChild.lastElementChild.classList.remove(
          "display-none"
        );
      } else {
        // Remove the warning message
        reqFields[
          i
        ].parentElement.firstElementChild.lastElementChild.classList.add(
          "display-none"
        );
      }
    }
  }
});

// Button NEXT 2
const btnNext2 = document.getElementsByClassName("btn-next")[1];
btnNext2.addEventListener("click", function(){
  step2El.classList.add("display-none");
  steps[2].classList.remove("display-none");
})

// Button NEXT 3
const btnNext3 = document.getElementsByClassName("btn-next")[2];
btnNext3.addEventListener("click", function(){
  steps[2].classList.add("display-none");
  steps[3].classList.remove("display-none");
})

// Button CONFIRM
const btnConfirm = document.getElementsByClassName("btn-confirm")[0];
btnConfirm.addEventListener("click", function(){
  steps[3].classList.add("display-none");
  document.querySelector(".step-5").classList.remove("display-none");
})
