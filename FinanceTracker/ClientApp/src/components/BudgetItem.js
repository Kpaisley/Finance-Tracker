import { useNavigate } from 'react-router-dom';
import './BudgetItem.css';
import { DeleteBudget, DeleteIcon } from './Buttons';

export const BudgetItem = (props) => {
    const budget = props.budget;
    const dateCreated = budget.dateCreated.toString();
    const navigator = useNavigate();

    
    //Delete a budget and its related categories once a user confirms they want to delete it.
    async function deleteBudget() {

        if (window.confirm('Are you sure you want to delete this budget and all its related data?') === true) {
            const budgetToDelete = {
                userId: props.budget.userId,
                budgetId: props.budget.id
            }

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(budgetToDelete)
            }

            try {
                await fetch('/budgets', requestOptions);
                props.populateBudgets();
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const redirectToBudget = () => {
        navigator('/user-budget', { state: { budget: { budget } } });
    }
    
    return (
        <div className="budget-item">
            <DeleteIcon action={deleteBudget} />

            <div className='budget-link' onClick={() => redirectToBudget() }>
                <h4>{props.budget.budgetName}</h4>
                <div><u>Created On</u></div>
                <div>{dateCreated.slice(0, 10)}</div>
            </div>          
        </div>
    );
}
