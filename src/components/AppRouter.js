import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Context } from '../index'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils.js/consts'
import { useAuthState } from 'react-firebase-hooks/auth'

function AppRouter() {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? (
        <Switch>
            {privateRoutes.map(({ path, Component }) => (
                <Route path={path} component={Component} key={path} exact />
            ))}
            <Redirect to={CHAT_ROUTE} />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map(({ path, Component }) => (
                <Route path={path} component={Component} key={path} exact />
            ))}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    )
}

export default AppRouter
