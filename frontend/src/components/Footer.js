import {Component} from "react";
import React from "react";
import logo from "../logo2.png";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <img src={logo} alt="Logo"
                         style={{width: "10px", height: "12px"}}/>
                    &nbsp;


                    Konstantina Manousaki
                </div>

                <div><a href="https://www.instagram.com/elephas_heart_made_jewelry/" target="_blank" rel="noopener noreferrer"> <i
                    className="fab fa-instagram" style={{color: "#92af75"}}></i></a>
                    &nbsp;
                    &nbsp;
                    <a href="https://www.facebook.com/elephasjewelry/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"
                                                                                          style={{color: "#92af75"}}></i>
                    </a>
                </div>

                <div><i className="fab fa-cc-visa"></i>
                    &nbsp;
                    &nbsp;
                    <i className="fab fa-cc-mastercard"></i>
                    &nbsp;
                    &nbsp;
                    <i className="fab fa-cc-paypal"></i>
                </div>
                
                <i className="far fa-copyright"> Copyright 2019</i>

            </div>


        )
    }
}

export default Footer;