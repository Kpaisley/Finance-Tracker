import { useAuth0 } from "@auth0/auth0-react";



export const Dashboard = (props) => {

    const { logout } = useAuth0();


    return(
        <div>
            <h1>Welcome to your Dashboard!</h1>

            <button onClick={() => logout()}>Log Out</button>


        </div>
    );

}