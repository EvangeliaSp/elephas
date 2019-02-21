import {Component} from "react";
import React from "react";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <i className="far fa-copyright"> Copyright 2019</i>
                <div><a href="https://www.instagram.com/elephas_heart_made_jewelry/" target="_blank"> <i
                    className="fab fa-instagram" style={{color: "#92af75"}}></i></a>
                    &nbsp;
                    &nbsp;
                    <a href="https://www.facebook.com/elephasjewelry/" target="_blank"><i className="fab fa-facebook-f"
                                                                                          style={{color: "#92af75"}}></i>
                    </a>
                </div>

                <div>Elephas - Konstantina Manousaki</div>

            </div>
        )
    }
}

export default Footer;