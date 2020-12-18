import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import RouteWithsubRoutesHoc from '../../routes/RouteWithSubRoutesHoc';
import AuthButton from './components/AuthButton';
import {data} from './data';

interface IAuthProps {
    img:string;
    name:string;
    href:string;
    color:string;
    history:any;
}

interface IProps{
    match:any;
    location:any;
    history:any;
    routes:any;
}

function LoginComponent(props:IProps) {
    return (
        <>
        {/* {props.routes.map((route:any) => (
          <RouteWithsubRoutesHoc {...route} key={route.path} />
        ))} */}
        {data.map((app) => {
            return (
                <AuthButton history = {props.history} {...app} key = {app.name}/>
            )
        })}
        </>
    )
}

export default LoginComponent
