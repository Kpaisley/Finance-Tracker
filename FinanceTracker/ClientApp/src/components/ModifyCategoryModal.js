import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { DeleteButton, CloseIcon, ModifyButton } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './ModifyCategoryModal.css';

export default function ModifyCategoryModal(props) {
    
    function validateInputs() {
        const categoryName = document.getElementById('new-category-name');
        const categoryLimit = document.getElementById('new-category-limit');
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
        const formInput = input.parentElement.parentElement;
        const small = formInput.querySelector('small');

        //Add success message inside small
        small.style.color = '#00be21';
        small.innerHTML = 'Looks good!'

        //Add success class to formInput
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
    


    async function modifyCategory() {
        const categoryName = document.getElementById('new-category-name');
        const categoryLimit = document.getElementById('new-category-limit');

        if (validateInputs() === true) {

            const categoryToModify = {
                userId: props.userId,
                budgetId: props.category.budgetId,
                categoryId: props.category.id,
                categoryName: categoryName.value,
                categoryLimit: parseFloat(categoryLimit.value).toFixed(2)
            }

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(categoryToModify)
            }

            try {
                await fetch('categories/', requestOptions);
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
                            <h3>Modify your Category!</h3>

                            <div className="form-input">
                                <label>Category Name</label>
                                <span className='input-wrapper'>
                                    <input id="new-category-name" type="text" placeholder={props.category.categoryName} maxLength="25"></input>
                                    <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                    <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                </span>
                                <small></small>
                            </div>



                            <div className="form-input">
                                <label>Category Limit</label>
                                <span className='input-wrapper'>
                                    <input id="new-category-limit" type="number" min="0.1" step="0.01" max="99999999.99" placeholder={props.category.categoryTotal.toFixed(2)}></input>
                                    <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                    <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                </span>
                                <small></small>
                            </div>
                            

                            <Stack className='button-stack' direction="row" spacing={2} >
                                <ModifyButton action={() => modifyCategory()} />
                                <DeleteButton action={props.deleteCategoryItem} />
                            </Stack>
                            
                        </form>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}