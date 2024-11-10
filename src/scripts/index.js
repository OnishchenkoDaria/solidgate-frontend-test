const form = document.getElementById("payment-form");

const cardNumber = document.getElementById("card-number");
const cardExpDate = document.getElementById("card-exp-date");
const cardCVC = document.getElementById("card-cvc");

const numberErrorMessage = document.querySelector("#card-number + span.error");
const dateErrorMessage = document.querySelector("#card-exp-date + span.error");
const cvcErrorMessage = document.querySelector("#card-cvc + span.error");

//success message
const modal = document.getElementById("success-modal");
const modalBackground = document.getElementById("modal-background");
const closeModalButton = document.getElementById("close-modal");

//boolean flag for date check
let isDateValid = false;

function showModal() {
    modal.classList.add("active");
    modalBackground.classList.add("active");
}

function hideModal() {
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
}

closeModalButton.addEventListener("click", hideModal);
modalBackground.addEventListener("click", hideModal);

/* MASKING USER INFO INPUT */
function formatCardNumber(){
    let value = cardNumber.value.replace(/\D/g, ''); // remove non-digit input
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
        //each %4 number is followed by space
        if (i % 4 == 0 && i > 0) {
            formattedValue += " ";
        }
        formattedValue += value[i];
    }
    cardNumber.value = formattedValue;
}

function formatCardExpDate(){
    let value = cardExpDate.value.replace(/\D/g, '');
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
        if (i == 2 && i > 0) {
            formattedValue += "/";
        }
        formattedValue += value[i];
    }
    cardExpDate.value = formattedValue;
}

function checkDate(cardMonth, cardYear){
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    if(cardMonth < 1 || cardMonth > 12) {
        return false;
    }

    return !(cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth));
}

/* INPUT VALIDATION CHECK */
function  checkValidNumber(){
    if(!cardNumber.validity.valid){
        showErrorMessage(
            cardNumber,
            numberErrorMessage,
            "Card number is required",
            "Invalid card number format",
            "Check card number"
        );
    } else {
        clearErrorMessage(numberErrorMessage);
    }
}

function checkValidDate(){
    const dateValue = cardExpDate.value.split('/');
    const cardMonth = parseInt(dateValue[0], 10);
    const cardYear = parseInt(dateValue[1], 10);

    if (!cardExpDate.validity.valid || isNaN(cardMonth) || isNaN(cardYear) || !checkDate(cardMonth, cardYear)) {
        showErrorMessage(
            cardExpDate,
            dateErrorMessage,
            "Expiration date is required",
            "Invalid expiration date format",
            "Check expiration date"
        );
        isDateValid = false;
    } else {
        clearErrorMessage(dateErrorMessage);
        isDateValid = true;
    }
}

function checkValidCVC(){
    if(!cardCVC.validity.valid){
        showErrorMessage(
            cardCVC,
            cvcErrorMessage,
            "CVC is required",
            "Invalid CVC format",
            "Check CVC"
        );
    } else {
        clearErrorMessage(cvcErrorMessage);
    }
}

/* EVENT LISTENERS & CHECK */
cardNumber.addEventListener("input", formatCardNumber);
cardExpDate.addEventListener("input", formatCardExpDate);

cardNumber.addEventListener("input", checkValidNumber);
cardExpDate.addEventListener("input", checkValidDate);
cardCVC.addEventListener("input", checkValidCVC);

form.addEventListener("submit", (event) => {
    //validate each field
    checkValidNumber();
    checkValidDate();
    checkValidCVC();

    if (!cardNumber.validity.valid ||
        !isDateValid ||
        !cardCVC.validity.valid) {
        event.preventDefault();
    } else {
        event.preventDefault();
        form.reset();
        showModal();
    }
});

/* DISPLAY ERROR MESSAGE */
function showErrorMessage(input, errorElement, missingMsg, formatMsg, lengthMsg){
    //all validation criteria (length, pattern, type)

    if(input.validity.valueMissing){
        errorElement.textContent = missingMsg;
    } else if(input.validity.patternMismatch){
        errorElement.textContent = formatMsg;
    } else if(input.validity.tooLong || input.validity.tooShort){
        errorElement.textContent = lengthMsg;
    } else{
        errorElement.textContent = "Input error occurred";
    }
    errorElement.classList.add("active");
}

function clearErrorMessage(errorElement){
    errorElement.textContent = "";
    errorElement.classList.remove("active");;
}