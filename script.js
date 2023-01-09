const reqFields = document.getElementsByClassName("form-input");
const btnNext = document.querySelector(".btn-next");
const step1El = document.querySelector(".step-1-content");
const step2El = document.querySelector(".step-2-content");
const inputEmail = reqFields[1];
const inputPhone = reqFields[2];

// STEP 1

// Input email validation
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

inputEmail.addEventListener("change", function (e) {
  e.preventDefault();
  validateEmail(inputEmail);
});

// Phone number validation

function validatePhone(number) {
  if (isNaN(number.value)) {
    alert("Your phone number is invalid");
    return false;
  } else {
    return true;
  }
}

inputPhone.addEventListener("change", function(e) {
  e.preventDefault();
  validatePhone(inputPhone);
});

btnNext.addEventListener("click", function (e) {
  // Prevent default form behaviour
  e.preventDefault();
  // No input field must be empty to proceed with button next
  if (
    reqFields[0].value !== "" &&
    reqFields[1].value !== "" &&
    reqFields[2].value !== ""
  ) {
    // do your action
    step1El.classList.add("display-none");
    step2El.classList.remove("display-none");
  }
});
