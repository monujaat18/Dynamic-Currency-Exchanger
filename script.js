const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
    for (curcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = curcode;
        newoption.value = curcode;
        if (select.name === "from" && curcode === "INR") {
            newoption.selected = "selected";
        } else {
            if (select.name === "to" && curcode === "USD") {
                newoption.selected = "selected";
            }
        }
        select.append(newoption);
    }
   select.addEventListener("change",(ent)=>{
      updflag(ent.target);
   })
}
const updflag = (element) =>{
   let curode = element.value;
   let countrycode = countryList[curode];
   let img = element.parentElement.querySelector("img");
   img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
}
  btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountval = amount.value;
    if(amountval === "" || amountval<0){
        amountval = 1;
        amount.value = "1";
    }
    const URL = `${url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountval * rate;
    console.log(finalAmount);
    msg.innerText = `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  })

 