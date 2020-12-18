import React from 'react'
import {Route} from 'react-router-dom';
function PublicRoutes({component:Component,...props}) {
    return (
        <Route {...props}
        render = {(props) => 
            <Component {...props}/>
        }
        >
        </Route>
    )
}

export default PublicRoutes
