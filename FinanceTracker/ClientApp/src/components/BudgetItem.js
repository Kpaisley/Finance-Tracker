import './BudgetItem.css';

export const BudgetItem = (props) => {
    var dateCreated = props.dateCreated.toString();

    return (
        <div className="budget-item">
            <div className="delete-btn">X</div>
            
            <h4>{props.budgetName}</h4>
            <span><u>Created On</u></span>
            <span>{dateCreated.slice(0,10)}</span>
        </div>
    );
}
