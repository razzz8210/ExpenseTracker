document.addEventListener("DOMContentLoaded",()=>{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmoountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateAmount();

    renderExpense();

    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmoountInput.value.trim());

        if(name!=="" && !isNaN(amount) && amount>0){

            const newExpenses = {
                id:Date.now(),
                name:name,
                amount:amount,
            }

            expenses.push(newExpenses);
            saveExpenseToLocal();
            renderExpense();
            updateTotal();


            //for clearing Input
            expenseNameInput.value = "";
            expenseAmoountInput.value = "";

        }
    })

    function renderExpense(){
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML= `
            ${expense.name} -$${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })
    }

    function calculateAmount(){
        return expenses.reduce((sum,expense)=> (sum+expense.amount) ,0)
    }

    function updateTotal(){
        totalAmount =calculateAmount();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpenseToLocal(){
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    expenseList.addEventListener("click",(e)=>{
        if(e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter( expense => expense.id !==expenseId);
        }
        saveExpenseToLocal();
        renderExpense();
        updateTotal();
    })
})