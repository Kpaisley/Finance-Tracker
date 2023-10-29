import { useAuth0 } from "@auth0/auth0-react";
import './HomeDefault.css';

export const HomeDefault = (props) => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div id="home-default" className='noselect'>
            <div className="finance-bg">
                <h1>BUDGET FLOW</h1>
                <h3>TRACK YOUR SPENDING TODAY</h3>
                <button onClick={() => loginWithRedirect()}>GET STARTED!</button>
            </div>
        </div>

        
    );



}