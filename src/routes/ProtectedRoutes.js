import React from 'react'
import {Redirect, Route} from 'react-router-dom';
function ProtectedRoutes({component:Component,...props}) {
    let isLoggedIn = true;
    return (isLoggedIn?
        <Route {...props}
        render = {(props) => 
            <Component {...props}/>
        }
        />
        : <Redirect to = '/'/>
    )
}

export default ProtectedRoutes
