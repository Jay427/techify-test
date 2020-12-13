import './App.css'; 
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
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

    render() {
        return (
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        );
    }
}

export default App;