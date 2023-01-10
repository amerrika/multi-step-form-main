const reqFields = document.getElementsByClassName("form-input");
const btnNext = document.querySelector(".btn-next");
const step1El = document.querySelector(".step-1-content");
const step2El = document.querySelector(".step-2-content");
const sidebar = document.querySelector(".sidebar");
const inputEmail = reqFields[1];
const inputPhone = reqFields[2];

// STEP 1

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

// Button Next Operation
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

// STEP 2

// toggle button, switch between monthly and yearly plan data

// default prikaz monthly

const btnToggle = document.querySelector(".switch-toggle-button");
const monPlans = document.getElementsByClassName("plan-info-m");
const yearPlans = document.getElementsByClassName("plan-info-y");
const extraInfos = document.getElementsByClassName("plan-info-extra");

btnToggle.addEventListener("click", function () {
  for (let i = 0; i < 3; i++) {
    yearPlans[i].classList.remove("display-none");
    extraInfos[i].classList.remove("display-none");
    monPlans[i].classList.add("display-none");
  }
});

// getting infos (name and price) from selected plan;
const planOptions = document.getElementsByClassName("plan-option");
let planPrice;
let planTitle;

for (let i = 0; i < planOptions.length; i++) {
  planOptions[i].addEventListener("click", function () {
    // yearly prices
    if (
      document.querySelector(".plan-info-m").classList.contains("display-none")
    ) {
      planPrice = parseInt(
        planOptions[i].querySelectorAll(".plan-price")[1].textContent
      );
      planTitle = planOptions[i].querySelector(".tertiary-heading").textContent;
      console.log(planPrice, planTitle);
    } else {
      // monthly prices
      planPrice = parseInt(
        planOptions[i].querySelectorAll(".plan-price")[0].textContent
      );
      planTitle = planOptions[i].querySelector(".tertiary-heading").textContent;
      console.log(planPrice, planTitle);
    }
  });
}

