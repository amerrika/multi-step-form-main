const reqFields = document.getElementsByClassName("form-input");
const btnNext = document.querySelector(".btn-next");
const step1El = document.querySelector(".step-1-content");
const step2El = document.querySelector(".step-2-content");
const inputEmail = reqFields[1];
const inputPhone = reqFields[2];

// STEP 1

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
    document.querySelector(".warning-email").textContent = "You have entered an invalid email address!";
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
        document.querySelector(".warning-phone").textContent = "You have entered an invalid phone number!";
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
    // do your action
    step1El.classList.add("display-none");
    step2El.classList.remove("display-none");
  } 
  // if there is an empty field, display a warning message
  else {
    for(let i = 0; i < reqFields.length; i++){
        if(reqFields[i].value == ""){
            reqFields[i].parentElement.firstElementChild.lastElementChild.classList.remove("display-none")
            // reqFields[i].classList.remove("display-none")
        }
    }
  }
});
