import {Component} from "react";
import React from "react";
import logo from "../logo2.png";
// import NavLink from "./components/nav_link";
import {NavLink} from "react-router-dom";

class Header extends Component {
    setClassName = (str, oldName) => {
        if (str === window.location.hash) {
            //console.log("returning active for str/hash: ", str, window.location.hash);
            return oldName + "active";
        } 
            
        return oldName;
    }
    
    render() {
        return (
            <div>

                <div className="header" style={{marginBottom: '3rem'}}>
                    <a href="#default" className="logo"> <img src={logo} alt="Logo"
                                                              style={{width: "46px", height: "60px"}}/>
                    </a>

                    <div className="header-right">
                        <nav>

                        <NavLink to="/" className={this.setClassName("", "")}>Home</NavLink>
                        <NavLink to="/product#bracelets" className={this.setClassName("#bracelets", "")}>Bracelets</NavLink>
                        <NavLink to="/product#rings" className={this.setClassName("#rings", "")}>Rings</NavLink>
                        <NavLink to="/product#necklaces" className={this.setClassName("#necklaces", "")}>Necklaces</NavLink>
                        <NavLink to="/product#earrings" className={this.setClassName("#earrings", "")}>Earrings</NavLink>

                        <NavLink to="#contact" className={this.setClassName("#contact", "")}>Contact</NavLink>
                        <NavLink to="#about" className={this.setClassName("#about", "")}>About</NavLink>

                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                              integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                              crossOrigin="anonymous"/>
                        <div className="user">
                            <a href="#cart" className={this.setClassName("#cart", "")}> <i className="fas fa-shopping-cart" rel="stylesheet"></i> </a>
                        </div>
                        <div className="cart">
                            <a href="#user" className={this.setClassName("#user", "")}> <i className="fas fa-user"></i> </a>

                        </div>
                        </nav>
                    </div>
                </div>
            </div>


        );
    }
}

export default Header;