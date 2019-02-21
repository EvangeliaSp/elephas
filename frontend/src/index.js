import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from "./user/login/Login";
import UserList from "./user/UserList";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path="/user/login" exact component={Login} />
            <Route path='/user/all' component={UserList} />
        </div>
    </Router>,
    //<App/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
