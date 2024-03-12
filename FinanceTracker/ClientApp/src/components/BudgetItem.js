import { useNavigate } from 'react-router-dom';
import './BudgetItem.css';
import { DeleteButton } from './Buttons';
import Stack from '@mui/material/Stack';
import ModifyBudgetModal from './ModifyBudgetModal';

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
            <div className="redirect-link" onClick={() => redirectToBudget()}>
                <h3>{props.budget.budgetName}</h3>
                <div><u>Created On</u></div>
                <div>{dateCreated.slice(0, 10)}</div>
            </div>
            <Stack direction="row" spacing={3}>
                <ModifyBudgetModal budget={budget} populateBudgets={props.populateBudgets} deleteBudget={deleteBudget} />
                <DeleteButton action={deleteBudget} />
            </Stack>
        </div>
    );
}
