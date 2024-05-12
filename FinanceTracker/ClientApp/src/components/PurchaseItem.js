import './PurchaseItem.css';

export const PurchaseItem = (props) => {

    
    
    return (
        <div className="purchase-item">
            {props.purchase.purchaseName + " ----- " + props.purchase.purchaseTotal +  " ----- " + props.getCategoryName(props.purchase.categoryId)}
            
        </div>
    );
}