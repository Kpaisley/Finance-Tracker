import './BudgetItem.css';

export const BudgetItem = (props) => {
    return (
        <div className="budget-item">
            <h4>{props.budgetName}</h4>
            <span>X</span>
        </div>
    );
}
