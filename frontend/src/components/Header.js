import {Component} from "react";
import logo from "../logo2.png";
import React from "react";

class Header extends Component {

    state = {};

    constructor() {
        super();

        this.state = {
            d: this.getBasketSize(81)
        }
    }

    getBasketSize = (idUser) => {
        const options = {
            method: 'GET'
        };

        fetch(`/order/cartSize/${idUser}`, options)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    d: data
                })
            })
    };

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
                            <a href="#cart">
                            <span className="fas fa-shopping-cart icon-grey badge" data-count={this.state.d}
                                  style={{color: "#92af75"}}>
                            </span>
                            </a>
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