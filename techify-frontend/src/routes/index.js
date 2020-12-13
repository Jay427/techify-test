import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '../pages/notFound';
import Dashboard from '../pages/dashboard';
import Register from '../pages/register';
import Login from '../pages/login';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Redirect to="/dashboard" />
                </Route>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Route path='/404' component={NotFound}/>
                <Redirect to='/404'/>
            </Switch>
        </BrowserRouter>
    )
};