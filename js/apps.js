"use strict";
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".budget-input");
const elBudget = document.querySelector(".span-budget");
const elExpensis = document.querySelector(".span-expensiss");
const elBalance = document.querySelector(".span-balance");

const elExpensisForm = document.querySelector(".form-xarajat");
const elExpenceInput = document.querySelector(".expence-input");
const elNameInput = document.querySelector(".name-input");
const elExpenceList = document.querySelector(".expence-list");

let budget = [];
let total = [];
let balance = [];
const allExp = [];
const allBalance = [];


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValue = elInput.value * 1;
  elInput.value = null;

  balance.push(inputValue)

  elBudget.textContent = balance.reduce((acc, element) => acc + element, 0);
  elBalance.textContent = balance.reduce((acc, element) => acc + element, 0) - total.reduce((acc, item) => acc + item, 0) + allBalance.reduce((acc, item) => acc + item, 0);
})

const renderBudget = function(item, htmlElement){

  item.forEach(item => {
    const newItem = document.createElement("li");
    const newTitle = document.createElement("p");
    const newText = document.createElement("p");
    const newButton = document.createElement("button");

    newItem.setAttribute("class", "d-flex align-items-baseline");
    newTitle.setAttribute("class", "text-success fw-bold");
    newText.setAttribute("class", "text-primary fw-bold");
    newButton.classList.add("remove");
    newTitle.style.marginRight = "200px";
    newText.style.marginRight = "200px"

    newTitle.textContent = item.name;
    newText.textContent = "$" + item.amount;

    newButton.dataset.removeItem = item.name;

    elExpensis.textContent = total.reduce((acc, item) => acc + item, 0) - allExp.reduce((acc, item) => acc + item, 0);
    elBalance.textContent = balance.reduce((acc, element) => acc + element, 0) - total.reduce((acc, item) => acc + item, 0) + allBalance.reduce((acc, item) => acc + item, 0);

    htmlElement.appendChild(newItem);
    newItem.appendChild(newTitle);
    newItem.appendChild(newText);
    newItem.appendChild(newButton);
  })
}


elExpensisForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const expenceInputValue = elExpenceInput.value *1;
  const nameInputValue = elNameInput.value;


  elExpenceInput.value = null;
  elNameInput.value = null;

  const myBudget = {
    amount: expenceInputValue,
    name: nameInputValue,
  }

  budget.push(myBudget);
  total.push(myBudget.amount);

  elExpenceList.innerHTML = null;

  renderBudget(budget, elExpenceList);
})


elExpenceList.addEventListener("click", (evt) => {
  if(evt.target.matches(".remove")){

    const removeId = evt.target.dataset.removeItem;
    const find = budget.find(item => item.name === removeId)
    const findElement = budget.findIndex(item => item.name === removeId);

    allExp.push(find.amount);
    allBalance.push(find.amount);

    budget.splice(findElement, 1);

    elExpenceList.innerHTML = null;

    renderBudget(budget, elExpenceList);


    elExpensis.textContent = total.reduce((acc, item) => acc + item, 0) - allExp.reduce((acc, item) => acc + item, 0);
    elBalance.textContent = balance.reduce((acc, element) => acc + element, 0) - total.reduce((acc, item) => acc + item, 0) + allBalance.reduce((acc, item) => acc + item, 0);
  }
})