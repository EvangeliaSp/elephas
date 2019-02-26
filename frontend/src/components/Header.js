import {Component} from "react";
import React from "react";
import logo from "../logo2.png";

class Header extends Component {
    render() {
        return (
            <div>

                <div className="header">
                    <a href="#default" className="logo"> <img src={logo} alt="Logo"
                                                              style={{width: "46px", height: "60px"}}/>
                    </a>

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
            </div>


        );
    }
}

export default Header;