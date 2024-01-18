import './AddBudget.css';

export const AddBudget = (props) => {

    //Expand form where user can add a new budget.
    function openBudgetForm(e) {

        //Open 'Budget Form' when 'Add Budget' button is clicked.
        const form = document.querySelector('.add-budget-form');
        form.classList.remove('hide');
        
        //Remove 'Add Budget' button from the user's view.
        const button = e.target;
        button.classList.add('hidden');

        //Reset any current error messages
        const errorMessage = document.querySelector('#budget-error-msg');
        errorMessage.innerHTML = '&nbsp;';
        errorMessage.classList.add('hide');
    }

    //Close form where user can add a new budget.
    function closeBudgetForm(e) {

        //Close 'Budget Form' when 'Close' button is clicked.
        const form = document.querySelector('.add-budget-form');
        form.classList.add('hide');

        //Reset any current text in the input box.
        const budgetInput = document.querySelector('.form-input');
        budgetInput.value = '';

        //Return 'Add Budget' button to the user's view.
        const button = document.querySelector('.add-budget-btn');
        button.classList.remove('hidden');


    }

    //Create a new budget using BudgetsController.cs
    async function createBudget(e) {
        e.preventDefault();
        const budgetName = e.target[0].value;
        const errorMessage = document.querySelector('#budget-error-msg');

        //Validate that a user has a budget name between 1 and 50 characters.
        if (budgetName.length < 1) {
            errorMessage.innerHTML = 'Budget Name must be 1 or more characters.'
            errorMessage.classList.remove('hide');
            return;
        }
        else if (budgetName.length > 50) {
            errorMessage.innerHTML = 'Budget Name must be less than 50 characters.'
            errorMessage.classList.remove('hide');
            return;
        }

        //Send params to BudgetsController to create a new budget.
        else {
            const budgetInfo = {
                userID: props.userID,
                budgetName: budgetName
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(budgetInfo),
            }

            try {
                props.setBudgetsLoading(true);
                const response = await fetch('/budgets', requestOptions);
                const data = await response.json();
                props.setBudgets(data);
                props.setBudgetsLoading(false);
            }
            catch (error) {
                console.log(error.message);
                props.setBudgetsLoading(false);
            }
        }

        //Close 'Add Budget' form when a budget is successfully created.
        closeBudgetForm();

        //Display 'Add Budget' button when a budget is successfully created.
        const button = document.querySelector('.add-budget-btn');
        button.classList.remove('hidden');
    }

   

    

    //Render if the user has reached the maximum number of budgets stored.
    if (props.budgetsLength >= 3) {

        return (
            <div id="max-budgets">
                Maximum Budgets Reached
            </div>
        );
    }

    //Render if the user has less than the maximum number of budgets stored.
    return (

        <div id="add-budget">
            <p className="add-budget-btn" onClick={(e) => openBudgetForm(e)}>Add Budget</p>

            <form className="add-budget-form hide" onSubmit={(e) => createBudget(e)}>
                <label className="form-label">Budget Name</label>
                <input className="form-input" type="text" maxLength='50'></input>
                <input className='submit-btn' type="submit" value="Create Budget"></input>
                <p id='budget-error-msg' className='hide'>&nbsp;</p>
                <p className='close-budget-btn' onClick={() => closeBudgetForm() }>Close</p>
            </form>
            

        </div>
    );
}
