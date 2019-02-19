import React, {Component} from 'react';
import logo from './elephas2.jpg';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">

                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a href="#bracelets">Bracelets</a>
                    <a href="#rings">Rings</a>
                    <a href="#necklaces">Necklaces</a>
                    <a href="#earrings">Earrings</a>

                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>

                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                          crossOrigin="anonymous"/>
                    <div className="user">
                        <a href="#cart"> <i class="fas fa-shopping-cart" rel="stylesheet"></i> </a>
                    </div>
                    <div className="cart">
                        <a href="#user"> <i className="fas fa-user"></i> </a>

                    </div>
                </div>
            </div>


        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>Content</h2>
                <p>The content text!!!</p>
            </div>
        );
    }
}

export default App;