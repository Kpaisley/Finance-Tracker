import { useEffect } from 'react';
import { useState } from 'react';
import './AddBudget.css';

export const AddBudget = (props) => {

    //Expand form where user can add a new budget.
    function openBudgetForm(e) {

        //Reset any current text in the input box.
        const budgetInput = document.querySelector('.form-input');
        budgetInput.value = '';

        //Reset any current error messages
        const errorMessage = document.querySelector('#error-msg');
        errorMessage.innerHTML = '&nbsp;';

        //Open 'Add Budget Form' when 'Add Budget Button' is clicked.
        const form = document.querySelector('.add-budget-form');
        form.classList.toggle('hide');

        //Change innerHTML of 'Add Budget Button' depending on the 'Budget Form' being open or closed.
        const button = e.target;
        (!form.classList.contains('hide'))
            ? button.innerHTML = 'Return'
            : button.innerHTML = 'Add Budget';

    }

    //Create a new budget using BudgetsController.cs
    async function createBudget(e) {
        e.preventDefault();
        const budgetName = e.target[0].value;
        const errorMessage = document.querySelector('#error-msg');

        //Validate that a user has a budget name between 1 and 50 characters.
        if (budgetName.length < 1) {
            errorMessage.innerHTML = 'Budget Name must be 1 or more characters.'
            return;
        }
        else if (budgetName.length > 50) {
            errorMessage.innerHTML = 'Budget Name must be less than 50 characters.'
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
                alert('Budget Created Successfully!');
                
            }
            catch (error) {
                console.log(error.message);
                props.setBudgetsLoading(false);
            }
        }

        //Close 'Add Budget Form' when a budget is successfully created.
        const form = document.querySelector('.add-budget-form');
        form.classList.toggle('hide');

        

        //Display 'Add Budget Button' when a budget is successfully created.
        const button = document.querySelector('.add-budget-btn');
        
        
        (form.classList.contains('hide'))
            ? button.innerHTML = 'Add Budget'
            : button.innerHTML = "Return"
        
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
                <p id='error-msg'>&nbsp;</p>
            </form>
            

        </div>
    );
}
