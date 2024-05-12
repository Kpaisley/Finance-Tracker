import { AddPurchaseForm } from './AddPurchaseForm';
import { PurchaseItem } from './PurchaseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './PurchaseInfo.css';


export const PurchaseInfo = (props) => {

    const dates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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


    const isMonthCurrent = () => {
        const date = new Date();
        const month = date.getMonth();

        if (month === props.month) {
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


    //Return loader icon if Purchases or Categories are populating.
    if (props.purchasesLoading || props.categoriesLoading) {
        return (
            <div className="loader"><div></div><div></div><div></div><div></div></div>
        );
    }

    else if (props.purchases.length <= 0) {
        return (
            <div className="no-purchases">
                <h3>Add an expense below to track it!</h3>
                <AddPurchaseForm populatePurchases={props.populatePurchases} categories={props.categories} populateCategories={props.populateCategories} userId={props.userId} budget={props.budget} />
                <div className="purchase-table">
                    <div className="expenses-date">
                        <FontAwesomeIcon className="chevron-icon-left" icon={faChevronLeft} size="xl" onClick={() => changeExpensesDate("back")} />
                        <h2>{dates[props.month] + " " + props.year}</h2>
                        <FontAwesomeIcon className="chevron-icon-right" icon={faChevronRight} size="xl" hidden={isMonthCurrent()} onClick={() => changeExpensesDate("forward")} />

                    </div>
                    <h3>
                        You are not tracking any expenses this month
                    </h3>
                </div>
            </div>
        );
    }



    else
        
        return (
            <div className="purchase-info">
                <h3>Manage your Expenses Below!</h3>
                <AddPurchaseForm populatePurchases={props.populatePurchases} categories={props.categories} populateCategories={props.populateCategories} userId={props.userId} budget={props.budget} />
                <div className="purchase-table">
                    <div className="expenses-date">
                        <FontAwesomeIcon className="chevron-icon-left" icon={faChevronLeft} size="xl" onClick={() => changeExpensesDate("back") } />
                        <h2>{dates[props.month] + " " + props.year}</h2>
                        <FontAwesomeIcon className="chevron-icon-right" icon={faChevronRight} size="xl" hidden={isMonthCurrent()} onClick={() => changeExpensesDate("forward")} />
                        
                    </div>
                    {
                        props.purchases.map(purchase =>
                            <PurchaseItem key={purchase.id} purchase={purchase} getCategoryName={getCategoryName} />
                        )
                    }
                </div>
            </div>
        );

}