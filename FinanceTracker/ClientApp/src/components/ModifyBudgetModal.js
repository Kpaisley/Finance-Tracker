import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { DeleteButton, CloseIcon, ModifyButton } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { useState } from 'react';


export default function ModifyBudgetModal(props) {

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

    async function modifyBudget() {
        const budgetName = document.getElementById('new-budget-name');

        if (validateInputs(budgetName) === true) {
            handleClose()

            const budgetInfo = {
                userId: props.budget.userId,
                budgetId: props.budget.id,
                budgetName: budgetName.value
            }

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(budgetInfo),
            }

            try {
                await fetch('/budgets', requestOptions);
                props.populateBudgets();
            }
            catch (error) {
                console.log(error);
            }
            
        }
    }



    return (
        <div>
            <ModifyButton action={handleOpen} />
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


                        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                            <h2>Modify your Budget!</h2>

                            <div className="form-input">
                                <label>Budget Name</label>
                                <span className='input-wrapper'>
                                    <input id="new-budget-name" type="text" placeholder={props.budget.budgetName} maxLength="25"></input>
                                    <FontAwesomeIcon className="checkmark-icon" icon={faCircleCheck} />
                                    <FontAwesomeIcon className="error-icon" icon={faCircleExclamation} />
                                </span>
                                <small></small>
                            </div>


                            <Stack className='button-stack' direction="row" spacing={2} >
                                <ModifyButton action={modifyBudget} />
                                <DeleteButton action={props.deleteBudget} />
                            </Stack>

                        </form>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );

}