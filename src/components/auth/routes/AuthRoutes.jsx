import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import RouteWithsubRoutesHoc from '../../../routes/RouteWithSubRoutesHoc'
function AuthRoutes({routes}) {
 const {url} = useRouteMatch();
    return (
        <>
        <ul>
        {routes.map((route) =>
          <li key = {route.path}>
            <NavLink
              className="nav-link nav-chat"
              to={url !== '/'?url+route.path:url}
              activeClassName="active"
            >
              {route.path.substr(1)}
            </NavLink>
          </li>
        )}
      </ul>
      {routes.map((route) => (
        <RouteWithsubRoutesHoc {...route} key={route.path} />
      ))}
      </>
    )
}

export default AuthRoutes
