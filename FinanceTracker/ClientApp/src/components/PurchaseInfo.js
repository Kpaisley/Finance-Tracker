import { AddPurchaseForm } from './AddPurchaseForm';
import { PurchaseItem } from './PurchaseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './PurchaseInfo.css';


export const PurchaseInfo = (props) => {

    const dates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //Changes the selected date forward or backwards by one month
    const changeExpensesDate = (value) => {
        if (value === "back" && props.month === 0) {
            props.setYear(props.year - 1);
            props.setMonth(11);
        }

        else if (value === "forward" && props.month === 11) {
            props.setYear(props.year + 1);
            props.setMonth(0);
        }

        else if (value === "back") {
            props.setMonth(props.month - 1)
        }

        else if (value === "forward" ) {
            props.setMonth(props.month + 1)
        }
    }

    //Return true if the month selected is the current month
    const isMonthCurrent = () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        if (month === props.month && year === props.year) {
            return true;
        }
        else
            return false;

    }               

    //Return a category name from the categoryId
    const getCategoryName = (categoryId) => {
        for (var i = 0; i < props.categories.length; i++) {
            if (props.categories[i].id === categoryId) {
                return props.categories[i].categoryName;
            }
        }
        
    }

    const purchases = () => {
        if (props.purchasesLoading) {
            return (
                <div>
                    <div>
                        <div className="spinner-loader"></div>
                    </div>
                </div>
            );
        }
        else if (props.purchases.length <= 0) {
            return (
                <h3>You are not tracking any expenses this month</h3>
            );
        }
        else return (
            props.purchases.map(purchase =>
                <PurchaseItem key={purchase.id} purchase={purchase} getCategoryName={getCategoryName} />
            )
        );

    }
        
        return (
            <div className="purchase-info">
                <h3>Manage your Expenses Below!</h3>
                <AddPurchaseForm populatePurchases={props.populatePurchases} categoriesLoading={props.categoriesLoading} categories={props.categories} populateCategories={props.populateCategories} userId={props.userId} budget={props.budget} month={props.month} year={props.year} />
                <div className="purchase-table">
                    <div className="expenses-date">
                        <FontAwesomeIcon className="chevron-icon-left" icon={faChevronLeft} size="xl" onClick={() => changeExpensesDate("back") } />
                        <h2>{dates[props.month] + " " + props.year}</h2>
                        <FontAwesomeIcon className="chevron-icon-right" icon={faChevronRight} size="xl" hidden={isMonthCurrent()} onClick={() => changeExpensesDate("forward")} />
                        
                    </div>
                    <div className="purchases">
                        {
                            purchases()
                        }
                    </div>
                </div>
                {
                    props.categories.map(category =>
                        <div key={category.id} >
                            {category.categoryName + " " + category.categoryTotal}
                            
                        </div>
                    )
                }
            </div>
        );

}