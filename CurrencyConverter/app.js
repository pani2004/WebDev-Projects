const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}
const updateFlag = (element)=>{
  let currCode = element.value
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
}
btn.addEventListener("click",async (evt)=>{
  evt.preventDefault()
  let amount = document.querySelector(".amount input ")
  let amtVal = amount.value
  if(amtVal==="" || amtVal<1){
    amtVal = 1
    amount.value = "1"
  }
  //console.log(fromCurr.value,toCurr.value)
  const URL =  `https://v6.exchangerate-api.com/v6/e45c4ff2bdd2fdd6d3ff095c/latest/${fromCurr.value.toLowerCase()}`
  let response = await fetch(URL)
  let data = await response.json();
  let exchangerate = data.conversion_rates[toCurr.value]
  console.log(exchangerate)
  let finalAmt = amtVal*exchangerate
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
})