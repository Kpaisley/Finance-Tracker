import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';



export const Dashboard = (props) => {
    const { logout, user } = useAuth0();

    const [budgets, setBudgets] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);

    async function populateBudgets(userID) {
        const response = await fetch('budgets/' + userID);
        const data = await response.json();
        setBudgets(data);
        setBudgetsLoading(false);
        
    }

    useEffect(() => {
        populateBudgets(user.sub)
    }, []);
     
    

    return (

        <div id="dashboard">
            <div className="dashboard-bg">
                <div className="logout-btn" onClick={() => logout()}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>

                <h1 className="title">Welcome to your Dashboard!</h1>
            </div>
            <div>
                <h3>You have {budgets.length} / 3 budgets!</h3>
            </div>
        </div>






        //<div>
        //    <h1>Welcome to your Dashboard!</h1>

        //    <button onClick={() => logout()}>Log Out</button>


        //    <div>
        //        {budgetsLoading ? (
        //            <h1>Loading...</h1>
        //        ) : (
        //            <h1>Total Budgets: { budgets.length }</h1>
        //        )}
        //    </div>
            
        //</div>
    );

}