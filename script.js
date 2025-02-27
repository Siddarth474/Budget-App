document.addEventListener('DOMContentLoaded' , () =>{

    const totalAmountInput = document.getElementById('budget-input');
    const expenseNameInput = document.getElementById('expense-input');
    const expenseCostInput = document.getElementById('cost-input');

    const setBudgetBtn = document.getElementById('budget-btn');
    const checkAmountBtn = document.getElementById('check-btn');

    const displayBudget = document.getElementById('total-budget');
    const displayTotalExpense = document.getElementById('total-expense');
    const displayBalance = document.getElementById('balance');
    
    const errorMessage = document.querySelector('.error-msg');
    const valueErrorMessage = document.querySelector('.error-value');
    const displayExpenseList = document.querySelector('.expense-list');

    
    let tempAmount = 0;
    let tempExpense = 0;
    let expenseArray = [];

    setBudgetBtn.addEventListener('click' , () => {
        tempAmount = totalAmountInput.value;

        if(tempAmount === "" || tempAmount < 0) {
            errorMessage.classList.remove('hidden');
        }
        else {
            errorMessage.classList.add('hidden');
            displayBudget.innerText = tempAmount;

            if(tempAmount - displayTotalExpense.innerText < 0) {
                displayBalance.innerText = 'No Balance';
            }
            else displayBalance.innerText = tempAmount - displayTotalExpense.innerText;

            totalAmountInput.value = "";
        }
    });

    const fetchExpenses = () => {
        let expense = expenseCostInput.value;
        let expenseName = expenseNameInput.value;
        if(expense === "" || expense < 0 || expenseName === "") {
            valueErrorMessage.classList.remove('hidden');
            return;
        }
        tempExpense += parseInt(expense);
        valueErrorMessage.classList.add('hidden');
        displayTotalExpense.innerText = tempExpense;

        const expenseList = {
            id : Date.now(),
            expense : expense,
            expenseName : expenseName
        };
        expenseArray.push(expenseList);
        showExpensesList();
        updateBalance();

        expenseCostInput.value = "";
        expenseNameInput.value = "";
    }
    
    checkAmountBtn.addEventListener('click' , fetchExpenses);

    const showExpensesList = () => {
        displayExpenseList.innerHTML = "";

        expenseArray.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('expenses-info');
            div.setAttribute('data-id',item.id);

            div.innerHTML = `
            <p id="product">${item.expenseName}</p>
            <span id="cost">₹ ${item.expense}</span>`;

            const iconDiv = document.createElement('div');
            iconDiv.classList.add('icon-container');

            let editButton = document.createElement('button');
            editButton.classList.add('fa-solid' ,'fa-pen-to-square');
            editButton.addEventListener('click' , () => editList(item.id));

            let delteButton = document.createElement('button');
            delteButton.classList.add('fa-solid', 'fa-trash');
            delteButton.addEventListener('click' , () => deleteList(item.id));

            iconDiv.appendChild(editButton);
            iconDiv.appendChild(delteButton);
            div.appendChild(iconDiv);
            displayExpenseList.appendChild(div);
        });
    }
    const editList = (id) => {
        const expenseToEdit = expenseArray.find(item => item.id === id);

        if(expenseToEdit) {
            expenseNameInput.value = expenseToEdit.expenseName;
            expenseCostInput.value = expenseToEdit.expense;
            expenseNameInput.focus();

            tempExpense -= expenseToEdit.expense;

            expenseArray = expenseArray.filter(item => item.id !== id);
            showExpensesList();
            updateBalance();
        }
    }

    const deleteList = (id) => {
        const expenseToRemove = expenseArray.find(item => item.id === id);

        if(expenseToRemove) {
            tempExpense -= expenseToRemove.expense;
        }

        expenseArray = expenseArray.filter(item => item.id !== id);

        displayTotalExpense.innerText = tempExpense;

        showExpensesList();
        updateBalance();
    }

    const updateBalance = () => {
        if(tempAmount - tempExpense < 0) {
            displayBalance.innerText = '0';
        }
        displayBalance.innerText = tempAmount - tempExpense;
    }
});