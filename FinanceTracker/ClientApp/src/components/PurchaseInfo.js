import { AddPurchaseForm } from './AddPurchaseForm';
import './PurchaseInfo.css';


export const PurchaseInfo = (props) => {
    //Return loader icon if purchases are populating.
    if (props.purchasesLoading || props.categoriesLoading) {
        return (
            <div className="loader"><div></div><div></div><div></div><div></div></div>
        );
    }

    else if (props.purchases.length <= 0) {
        return (
            <div className="no-purchases">
                <h3>Add an expense below to track it!</h3>
                <AddPurchaseForm categories={props.categories} populateCategories={props.populateCategories} userId={props.userId} budget={props.budget} />
            </div>
        );
    }



    else
        return (
            <div className="purchase-info">
                <h3>Manage your Expenses Below!</h3>
                <AddPurchaseForm categories={props.categories} populateCategories={props.populateCategories} userId={props.userId} budget={props.budget} />
            </div>
        );

}