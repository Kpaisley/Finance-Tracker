﻿import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './LogoutButton.css';


export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <div className="logout-btn" onClick={() => logout()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
    );
}