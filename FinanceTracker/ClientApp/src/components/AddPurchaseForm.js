
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton, RefreshIcon } from './Buttons';
import './AddPurchaseForm.css';
import AddCategoryModal from './AddCategoryModal';

export const AddPurchaseForm = (props) => {


    //Reset Add Purchase Form values and any error messages
    function resetPurchaseForm() {
        var name = document.getElementById('add-purchase-name');
        var total = document.getElementById('add-purchase-total');
        var category = document.getElementById('add-purchase-category');
        var date = document.getElementById('add-purchase-date');
        var successMsg = document.querySelector('.success-msg');

        //Reset any values contained in the input fields
        name.value = "";
        total.value = "";
        if (props.categories.length !== 0) {
            category.value = props.categories[0].id;
        }
        date.value = "";

        //Reset success message
        successMsg.innerHTML = '';

        
        const formInput = document.querySelectorAll('.add-purchase-input');

        
        for (var x = 0; x < formInput.length; x++) {
            const message = formInput[x].querySelector('small');

            //Remove any error messages
            message.innerHTML = '';

            //Remove error / success class from .add-purchase-input
            formInput[x].className = "add-purchase-input";
        }


    }



    //Add Purchase to database
    async function addPurchase() {
        const purchaseName = document.getElementById('add-purchase-name');
        const purchaseTotal = document.getElementById('add-purchase-total');
        const purchaseCategory = document.getElementById('add-purchase-category');
        const purchaseDate = document.getElementById('add-purchase-date');

        

        if (validateInputs(purchaseName, purchaseTotal, purchaseCategory, purchaseDate) === true) {

            const successMsg = document.querySelector('.success-msg');

            const purchaseToAdd = {
                userId: props.userId,
                budgetId: props.budget.id,
                categoryId: purchaseCategory.value,
                purchaseName: purchaseName.value,
                purchaseTotal: parseFloat(purchaseTotal.value).toFixed(2),
                purchaseDate: purchaseDate.value
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(purchaseToAdd)
            }

            resetPurchaseForm();

            try {
                await fetch('/purchases', requestOptions);
                successMsg.innerHTML = purchaseToAdd.purchaseName + " added!";
                props.populatePurchases();
            }
            catch (error) {
                console.log(error.message);
            }

        }
        
    }

    //Validate user inputs before sending to API
    function validateInputs(purchaseName, purchaseTotal, purchaseCategory, purchaseDate) {
        var nameSuccess = false;
        var totalSuccess = false;
        var categorySuccess = false;
        var dateSuccess = false;


        //Validate purchaseName
        if (purchaseName.value === '') {
            setErrorFor(purchaseName, 'Expense name must contain at least <strong>1 character</strong>')
        }
        else if (purchaseName.value.length > 50) {
            setErrorFor(purchaseName, 'Expense name cannot exceed <strong>50</strong> characters')
        }
        else {
            setSuccessFor(purchaseName);
            nameSuccess = true;
        }

        //Validate purchaseTotal
        if (purchaseTotal.value === '' || purchaseTotal.value < 1) {
            setErrorFor(purchaseTotal, 'Expense total must be greater than <strong>$1.00</strong>');
        }
        else if (parseFloat(purchaseTotal.value).toFixed(2) >= 10000000.00) {
            setErrorFor(purchaseTotal, 'Expense total must be less than <strong>10</strong> million')
        }
        else {
            setSuccessFor(purchaseTotal);
            totalSuccess = true;
        }

        //Validate purchaseCategory
        if (purchaseCategory.value === '') {
            setErrorFor(purchaseCategory, ('You must select a category <br /> <strong> Create one below!</strong>'))
        }

        else {
            setSuccessFor(purchaseCategory);
            categorySuccess = true;
        }

        //Validate purchaseDate
        if (purchaseDate.value === '') {
            setErrorFor(purchaseDate, 'Please select a date')
        }

        else {
            setSuccessFor(purchaseDate)
            dateSuccess = true;
        }
        
        
        if (nameSuccess === true && totalSuccess === true && categorySuccess === true && dateSuccess === true) {
            return true;
        }
        
        return false;
        
    }

    function setErrorFor(input, message) {
        const formInput = input.parentElement.parentElement;
        const errorMsg = formInput.querySelector('small');

        //Add error message
        errorMsg.innerHTML = message;
        errorMsg.style.color = '#d32f2f';

        //Add error class to .add-purchase-input
        formInput.className = "add-purchase-input error";
    }

    function setSuccessFor(input) {
        const formInput = input.parentElement.parentElement;
        const message = formInput.querySelector('small');

        //Remove any error messages
        message.innerHTML = "";

        //Add success class to .add-purchase-input
        formInput.className = "add-purchase-input success";
    }


    return (
        <form id="add-purchase-form">

            <div className="add-purchase-input">
                <label>Expense Name</label>
                <span className="purchase-input-wrapper">
                    <input type='text' id="add-purchase-name" placeholder="Fuel" maxLength="50" autoFocus></input>
                    <FontAwesomeIcon className="purchase-checkmark-icon" icon={faCircleCheck} />
                    <FontAwesomeIcon className="purchase-error-icon" icon={faCircleExclamation} />
                </span>
                <small></small>
            </div>

            <div className="add-purchase-input">
                <label>Expense Total</label>
                <span className="purchase-input-wrapper">
                    <input type='number' id="add-purchase-total" min="0.1" step="0.01" max="9999999.99" placeholder="60.00"></input>
                    <FontAwesomeIcon className="purchase-checkmark-icon" icon={faCircleCheck} />
                    <FontAwesomeIcon className="purchase-error-icon" icon={faCircleExclamation} />
                </span>
                <small></small>
            </div>

            <div className="add-purchase-input">
                <label>Category</label>
                <span className="purchase-input-wrapper">
                    <select id="add-purchase-category">
                        {props.categories.map(category =>
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                        )}
                    </select>
                    <FontAwesomeIcon className="purchase-checkmark-icon" icon={faCircleCheck} />
                    <FontAwesomeIcon className="purchase-error-icon" icon={faCircleExclamation} />
                </span>
                <small></small>
                <span className="add-category-modal"><AddCategoryModal userId={props.userId} budgetId={props.budget.id} populateCategories={props.populateCategories} /></span>
            </div>

            <div className="add-purchase-input">
                <label>Date of Expense</label>
                <span className="purchase-input-wrapper">
                    <input type="date" id="add-purchase-date" ></input>
                    <FontAwesomeIcon className="purchase-checkmark-icon" icon={faCircleCheck} />
                    <FontAwesomeIcon className="purchase-error-icon" icon={faCircleExclamation} />
                </span>
                <small></small>
            </div>


            <div className="add-purchase-buttons">
                <PrimaryButton text={"Add"} action={addPurchase} />
                <RefreshIcon action={resetPurchaseForm} />
            </div>

            <span className="success-msg"></span>
        </form>
    );
}