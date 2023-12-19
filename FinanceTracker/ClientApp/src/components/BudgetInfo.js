import './BudgetInfo.css';
import { BudgetItem } from './BudgetItem';

export const BudgetInfo = (props) => {

    //Return loader icon if budgets are populating.
    if (props.budgetsLoading) {
        return (
            <div className="loader"><div></div><div></div><div></div><div></div></div>
        );
    }

    //Return message to user that there are no budgets currently in the database.
    else if (props.budgets.length <= 0) {
        return (
            <div className="no-budgets">
                <h3>You currently have <strong>0</strong> budgets stored in the database</h3>
                <div>Create a budget by clicking on 'Add Budget' above</div>
            </div>
        );
    }

    //Return a list of the users budgets if any are retrieved from the database.
    else
        return (
            <div className="budget-info">
                {

                    props.budgets.map(budget =>
                        <BudgetItem key={budget.id} budget={budget} populateBudgets={props.populateBudgets} />
                    )
                }
            </div>
        );

}