import React, {Component} from 'react';
import Footer from "./components/Footer"
import Header from "./components/Header"
import './App.css';
import product1 from './product2.jpg'
import HomePageGrid from "./product/HomePageGrid";


class App extends Component {
    render() {
        return (
            <div>
\                <Content/>
                <HomePageGrid/>

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
                <div className="topLine">
                    <div className="bestSeller">Featured Products</div>
                    <div>
                    </div>

                </div>
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


export default App;