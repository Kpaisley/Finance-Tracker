import './BudgetItem.css';

export const BudgetItem = (props) => {
    var dateCreated = props.dateCreated.toString();

    //Delete a budget and its related categories once a user confirms they want to delete it.
    async function deleteBudget(budgetID) {
        if (window.confirm('Are you sure you want to delete this budget and all its related data?') == true) {

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
            }
            try {
                const response = await fetch('/budgets/' + budgetID, requestOptions);
                const data = await response.json();
                props.setBudgets(data);
                

            }
            catch (error) {
                console.log(error.message);
            }
        } 
    }

    return (
        <div className="budget-item">
            <div className="delete-btn" onClick={() => deleteBudget(props.budgetID) }>X</div>
            
            <h4>{props.budgetName}</h4>
            <span><u>Created On</u></span>
            <span>{dateCreated.slice(0,10)}</span>
        </div>
    );
}
