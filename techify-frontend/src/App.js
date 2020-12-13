import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import AppRoutes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import axios from 'axios';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // 401 means user is not authenticated, set user to empty object({})
        if (error.response && error.response.status === 401) {

            localStorage.removeItem('token');

            setAuthorizationToken(false);

        }

        return Promise.reject(error);
    }
);

if (localStorage.token) {

    setAuthorizationToken(localStorage.token);

} else {

    setAuthorizationToken(false);

}

class App extends Component {

    onClickLogout() {
        console.log("log :: onClickLogout ::")
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        window.location.replace('http://localhost:3000/login');
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                            <div className="container">
                                <Link className="navbar-brand" to={"/login"}>Techify</Link>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/login"}>Sign in</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/register"}>Sign up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={() => { this.onClickLogout() }}>Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <AppRoutes />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;