// this link is used to fetch currency conveter api
const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const propdowns = document.querySelectorAll(".dropdown select");
// select he button area
const btn = document.querySelector("form button");
// Access the from area 
const fromCurr = document.querySelector(".form select");
// Access the To area 
const toCurr = document.querySelector(".to select");
//Access the msg 
let msg = document.querySelector(".msg");
// this modular is set the country list 
for (let select of propdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    // this modular is used to update the flage
    // this is main code to change the flage 
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
//this code is used to change the country name  
const updateFlag = (element) => {
    let currCode = element.value;
    // currency code se contory list lana hai
    let countryCode = countryList[currCode]; //
    // this line fatch the link on html page of the img source 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // INR
    // this is fatch the img link 
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// This modular is used <button>Get Exchance Rate</button> performe 
btn.addEventListener("click", async (evt) => {
    // its default action should not be taken as it normally would be.
    // it is preventDefault
    evt.preventDefault();
    // Access the amount frome the user via the input.
    let amount = document.querySelector(".amount input");
    // print the amount value 
    let amtVal = amount.value;
    // some change condition 
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // currency api work on this line of code and change the currency
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Fetching");
        }
        // send the data
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];

        if (rate === undefined) {
            throw new Error("Invalid currency code");
        }
        if (!rate) {
            throw new Error("Exchange rate not found");
        }
        let finalAmount = parseFloat(amtVal) * rate;
        // update msg div
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
});