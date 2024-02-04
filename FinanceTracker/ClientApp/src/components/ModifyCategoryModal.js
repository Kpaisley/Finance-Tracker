import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './ModifyCategoryModal.css';

export default function ModifyCategoryModal(props) {

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
                        
                        <form id="modify-category-form">
                            <div className="delete-btn" onClick={props.handleClose}>X</div>
                            <h4>Modify your Category!</h4>
                            <label>Category Name</label>
                            <input type="text" placeholder={props.category.categoryName}></input>
                            <label>Category Limit</label>
                            <input type="number" min="0.1" step="0.01" max="99999999.99" placeholder={props.category.categoryTotal}></input>
                        </form>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}