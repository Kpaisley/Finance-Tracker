import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CloseIcon, PrimaryButton, PrimaryButtonSolid } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { useState } from 'react';

export default function AddBudgetModal(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function validateInputs(budgetName) {
        var regex = /^(?=.*[a-zA-Z0-9])[\w\s]{1,50}$/;
        

        if (budgetName.value.length <= 0) {
            setErrorFor(budgetName, 'Budget name cannot be blank');
            return false;
        }
        else if (budgetName.value.length > 50) {
            setErrorFor(budgetName, 'Budget name must be 50 characters or less');
            return false;
        }
        else if (regex.test(budgetName.value) === false) {
            setErrorFor(budgetName, 'Budget name is not valid');
            return false;
        }
        else {
            setSuccess(budgetName);
            return true;
        }
        

    }

    function setSuccess(input) {
        const formInput = input.parentElement.parentElement;
        const small = formInput.querySelector('small');

        //Remove any error messages from small
        small.innerHTML = "";

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

    
    async function addBudget() {
        const budgetName = document.getElementById('add-budget-name');

        if (validateInputs(budgetName) === true) {

            handleClose();

            const budgetInfo = {
                userId: props.userId,
                budgetName: budgetName.value
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(budgetInfo),
            }

            try {
                await fetch('/budgets', requestOptions);
                props.populateBudgets();
            }
            catch (error) {
                console.log(error.message);
            }

            
        }
    }


    return  (
        <div>
            <PrimaryButtonSolid disabled={props.budgetsLength >= 3 || props.budgetsLoading} text="Add Budget" action={handleOpen} />

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box className="box">

                            <CloseIcon action={handleClose} />


                            <form className="modal-form" onSubmit={(e) => e.preventDefault() }>
                                <h2>Add a Budget!</h2>

                                <div className="form-input">
                                    <label>Budget Name</label>
                                    <span className='input-wrapper'>
                                        <input id="add-budget-name" type="text" maxLength="50" placeholder="Personal Budget"></input>
                                        <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                        <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                    </span>
                                    <small></small>
                                </div>



                                <div className="add-btn">
                                    <PrimaryButton text={"Add Budget"} action={addBudget} />
                                </div>
                            </form>


                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );


}