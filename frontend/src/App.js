import React, {Component} from 'react';
import logo from './logo2.png';
import './App.css';
import product1 from './product2.jpg'


class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}



class Header extends React.Component {
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


class Content extends React.Component {
    render() {
        return (
            <div>
                <div className="elephants">
                    <img src={product1} alt="Elephas"/>
                </div>
                <div className="intro">Welcome to Elephas.. HeartMade Jewelry since 2016</div>
                <div className="bestSeller">Most Recent Products</div>
                <div className="fb">
                    {/*<iframe*/}
                    {/*src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Felephasjewelry&width=600&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=435"*/}
                    {/*scrolling="yes"*/}
                    {/*style={{*/}
                    {/*border: "none",*/}
                    {/*overflow: "hidden",*/}
                    {/*width: "500px",*/}
                    {/*height: "400px",*/}
                    {/*background: "white",*/}
                    {/*}}*/}

                    {/*allowTransparency="true"></iframe>*/}

                </div>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <img src={logo} alt="Logo"
                         style={{width: "0.625em", height: "0.750em"}}/>
                    &nbsp;


                    Konstantina Manousaki
                </div>

                <div><a href="https://www.instagram.com/elephas_heart_made_jewelry/" target="_blank"> <i
                    className="fab fa-instagram" style={{color: "#92af75"}}></i></a>
                    &nbsp;
                    &nbsp;
                    <a href="https://www.facebook.com/elephasjewelry/" target="_blank"><i className="fab fa-facebook-f"
                                                                                          style={{color: "#92af75"}}></i>
                    </a>
                </div>
                <div><i className="fab fa-cc-visa"></i>
                    &nbsp;
                    &nbsp;
                    <i className="fab fa-cc-mastercard"></i>
                    &nbsp;
                    &nbsp;
                    <i class="fab fa-cc-paypal"></i>
                </div>
                <i className="far fa-copyright"> Copyright 2019</i>


            </div>


        )
    }
}

export default App;