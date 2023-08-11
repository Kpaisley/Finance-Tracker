import { useAuth0 } from "@auth0/auth0-react";

export const Home = (props) => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    

    

    return (
      <div>
            <h1>Budget Flow</h1>

            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => logout()}>Log Out</button>

            <h3>Logged In: { String(isAuthenticated) }</h3>

            
      </div>
    );
 
}
