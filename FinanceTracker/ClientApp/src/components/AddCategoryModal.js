import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CloseIcon, PrimaryButton } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './CategoryModal.css';


export default function AddCategoryModal(props) {

    function validateInputs() {
        const categoryName = document.getElementById('add-category-name');
        const categoryLimit = document.getElementById('add-category-limit');
        var nameSuccess = false;
        var limitSuccess = false;

        if (categoryName.value === '') {
            setErrorFor(categoryName, 'Category name cannot be blank');
        }
        else if (categoryName.value.length > 25) {
            setErrorFor(categoryName, 'Category name must be less than 25 characters');
        }

        else {
            nameSuccess = true;
            setSuccess(categoryName);
        }

        if (categoryLimit.value < 1) {
            setErrorFor(categoryLimit, 'Category limit must be greater than 1');
        }
        else if (parseFloat(categoryLimit.value).toFixed(2) >= 100000000.00) {
            setErrorFor(categoryLimit, 'Category limit must be less than 100 million');
        }
        else {
            limitSuccess = true;
            setSuccess(categoryLimit);
        }

        if (nameSuccess === true && limitSuccess === true) {
            return true;
        }

        return false;

    }

    function setSuccess(input) {
        //Add success class to formInput
        const formInput = input.parentElement.parentElement;
        
        formInput.className = 'form-input success';
    }

    function setErrorFor(input, message) {
        const formInput = input.parentElement.parentElement;
        const small = formInput.querySelector('small');

        //Add error message inside small
        small.style.color = '#d32f2f';
        small.innerHTML = message;

        //Add error class to formInput
        formInput.className = 'form-input error';

    }

    async function addCategory() {
        const categoryName = document.getElementById('add-category-name');
        const categoryLimit = document.getElementById('add-category-limit');

        if (validateInputs() === true) {

            const categoryToAdd = {
                userId: props.userId,
                budgetId: props.budgetId,
                categoryName: categoryName.value,
                categoryLimit: parseFloat(categoryLimit.value).toFixed(2)
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(categoryToAdd)
            }

            try {
                await fetch('/categories', requestOptions);
                props.handleClose();
                props.populateCategories();
            }
            catch (error) {
                console.log(error);
            }
        }

    }






    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.open}>
                    <Box className="box">

                        <CloseIcon action={props.handleClose} />


                        <form id="modify-category-form">
                            <h3>Add a Category!</h3>

                            <div className="form-input">
                                <label>Category Name</label>
                                <span className='input-wrapper'>
                                    <input id="add-category-name" type="text" maxLength="25" placeholder="Bills"></input>
                                    <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                    <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                </span>
                                <small></small>
                            </div>



                            <div className="form-input">
                                <label>Category Limit</label>
                                <span className='input-wrapper'>
                                    <input id="add-category-limit" type="number" min="0.1" step="0.01" max="99999999.99" placeholder="2000.00"></input>
                                    <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                    <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                </span>
                                <small></small>
                            </div>

                            <PrimaryButton text={"Add Category"} action={addCategory} />

                        </form>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );

}