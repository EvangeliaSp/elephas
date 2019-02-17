import React, {Component} from 'react';
import logo from './elephas.jpg';
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
                <a href="#default" className="logo">
                    <img src={logo} alt="logo" width="128" height="64" margin-top="50px"/> </a>
                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a  href="#bracelets">Bracelets</a>
                    <a href="#rings">Rings</a>
                    <a  href="#necklaces">Necklaces</a>
                    <a  href="#earrings">Earrings</a>

                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
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