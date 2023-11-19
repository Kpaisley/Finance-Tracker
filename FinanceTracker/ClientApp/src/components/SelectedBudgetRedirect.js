import { useLocation } from 'react-router-dom';
import { SelectedBudget } from './SelectedBudget';


//Redirect user to the dashboard if the URL is manually typed in. Otherwise display the selected budget.
export const SelectedBudgetRedirect = () => {
    const location = useLocation();


    return (
        (!location.state)
            ? window.location.href = ""
            : <SelectedBudget budget={location.state.budget.budget} />
    );
}