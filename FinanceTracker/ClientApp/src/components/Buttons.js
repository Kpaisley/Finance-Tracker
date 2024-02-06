import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faDeleteLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './Buttons.css';

export const PrimaryButton = (props) => {

    return (
        <div onClick={props.action}>
            <Button variant="outlined">{props.text}</Button>
        </div>
    );
}

export const DeleteButton = (props) => {

    return (
        <div onClick={props.action}>
            <Button variant="outlined" color="error">
                Delete
            </Button>
        </div>
    );
}

export const ModifyIcon = (props) => {

    return (
        
        <IconButton onClick={props.action} size="large">
            <FontAwesomeIcon icon={faPenToSquare} className="modify-category-icon"></FontAwesomeIcon>
        </IconButton>
        
    );  
}

export const DeleteIcon = (props) => {

    return (
        <div onClick={props.action} className="delete-btn">X</div>
    );
}

export const DeleteArrowIcon = (props) => {

    return (
        <IconButton onClick={props.action} size="large">            
            <FontAwesomeIcon icon={faDeleteLeft} className='delete-category-icon' ></FontAwesomeIcon>
        </IconButton>
    );
}

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
            <div className="logout-btn" onClick={logout}>
            <IconButton size="large">
                <div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
            </IconButton>
        </div>
        

    );
}

