// Select buttons
const AppleButton = document.getElementById("Apple");
const PayPalButton = document.getElementById("PayPal");
const GoogleButton = document.getElementById("Google");

let caseIndex = 0;

function handleButtonClick() {
    //increment the caseIndex
    caseIndex = (caseIndex + 1) % 5;

    //set visibility for all buttons at the start to hidden
    AppleButton.classList.add("hidden");
    PayPalButton.classList.add("hidden");
    GoogleButton.classList.add("hidden");

    //handle 5 toggles
    switch (caseIndex) {
        case 0:
            console.log("Case 0 activated");
            AppleButton.classList.remove("hidden");
            break;
        case 1:
            console.log("Case 1 activated");
            PayPalButton.classList.remove("hidden");
            break;
        case 2:
            console.log("Case 2 activated");
            AppleButton.classList.remove("hidden");
            PayPalButton.classList.remove("hidden");
            break;
        case 3:
            console.log("Case 3 activated");
            GoogleButton.classList.remove("hidden");
            PayPalButton.classList.remove("hidden");
            break;
        case 4:
            console.log("Case 4 activated");
            GoogleButton.classList.remove("hidden");
            break;
        default:
            console.log("Invalid case");
    }
}
