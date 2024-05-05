import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faDeleteLeft, faPenToSquare, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './Buttons.css';

export const PrimaryButton = (props) => {

    return (
        
        <Button onClick={props.action} variant="outlined" className="primary-btn">{props.text}</Button>
        
    );
}

export const PrimaryButtonSolid = (props) => {

    return (
        <Button onClick={props.action} variant="contained" disabled={props.disabled}>{props.text}</Button>
    );
}

export const LinkButton = (props) => {
    return (

        <Link to={props.href}>
            <Button size="medium" variant="contained">{props.text}</Button>
        </Link>

    );
}

export const DeleteButton = (props) => {

    return (
        
        <Button onClick={props.action} variant="outlined" color="error" endIcon={<FontAwesomeIcon icon={faDeleteLeft} />} size="small">
            Delete
        </Button>
        
    );
}

export const ModifyButton = (props) => {

    return (

        <Button onClick={props.action} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPenToSquare} />} size="small" >
            Modify
        </Button>

    );
}

export const RefreshIcon = (props) => {

    return (
        <Button onClick={props.action} variant="outlined" className="refresh-icon" >
                <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
        </Button>
    );
}

export const ModifyIcon = (props) => {

    return (
        
        <IconButton onClick={props.action} size="large">
            <FontAwesomeIcon icon={faPenToSquare} className="modify-icon"></FontAwesomeIcon>
        </IconButton>
        
    );  
}

export const CloseIcon = (props) => {

    return (
        <div onClick={props.action} className="delete-btn">X</div>
    );
}

export const DeleteArrowIcon = (props) => {

    return (
        <IconButton onClick={props.action} size="large">            
            <FontAwesomeIcon icon={faDeleteLeft} className='delete-arrow-icon' ></FontAwesomeIcon>
        </IconButton>
    );
}

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
            <div className="logout-btn" onClick={logout}>
            <IconButton size="medium">
                <div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
            </IconButton>
        </div>
        

    );
}

