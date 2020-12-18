import React from 'react'
import AuthRoutes from './routes/AuthRoutes'

interface Props{
    routes : any[]
}

function AuthComponent(props:Props){
    return (
        <AuthRoutes routes = {props.routes}/>
    )
}

export default AuthComponent
