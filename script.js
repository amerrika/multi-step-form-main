const reqFields = document.getElementsByClassName("form-input");
const btnNext = document.querySelector(".btn-next");
const step1El = document.querySelector(".step-1-content");
const step2El = document.querySelector(".step-2-content");



// STEP 1



btnNext.addEventListener("click", function(e){
    // Prevent default form behaviour
    e.preventDefault();
    // No input field must be empty, to proceed with button next
    if(reqFields[0].value !== "" &&
       reqFields[1].value !== "" &&
       reqFields[2].value !== ""){
        // do your action
        step1El.classList.add("display-none");
        step2El.classList.remove("display-none");
       }
})