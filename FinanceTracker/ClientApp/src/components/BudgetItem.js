import { useNavigate } from 'react-router-dom';
import './BudgetItem.css';
import { DeleteButton, ModifyButton } from './Buttons';
import Stack from '@mui/material/Stack';

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
                <h4>{props.budget.budgetName}</h4>
                <div><u>Created On</u></div>
                <div>{dateCreated.slice(0, 10)}</div>
            </div>
            <Stack direction="row" spacing={3}>
                <ModifyButton />
                <DeleteButton action={deleteBudget} />
            </Stack>
        </div>
    );
}
