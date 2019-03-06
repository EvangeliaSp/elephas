import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from "./user/login-logout/Login";
import UserList from "./user/UserList";
//import ProductList from "./product/ProductList"; //NOTE: just to show a list of products
import ProductGrid from "./product/ProductGrid";
import Profile from "./user/profile/Profile";
import Register from "./user/Register";
import ProductDetail from "./product/ProductDetail";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowCart from "./order/ShowCart";


ReactDOM.render(
    <Router>
        <div>
            <Header/>
            <Route exact path='/' component={App} />
            <Route path="/user/login" exact component={Login} />
            <Route path='/user/all' component={UserList} />
            <Route path='/product' component={ProductGrid} />
            <Route path='/product/findBy' component={ProductGrid} /> 
            <Route path='/product/findById/:id' component={ProductDetail} />
            <Route path='/user/profile' component={Profile}/>
            <Route path='/user/register' component={Register}/>
            <Route path='/order/cart' component={ShowCart}/>
            <Route path='/about' component={About}/>
            <Footer/>
        </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
