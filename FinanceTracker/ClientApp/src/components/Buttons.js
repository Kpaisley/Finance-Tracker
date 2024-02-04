import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
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

export const DeleteIcon = (props) => {

    return (
        <div onClick={props.action} className="delete-btn">X</div>
    );
}

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <div className="logout-btn" onClick={() => logout()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
    );
}

