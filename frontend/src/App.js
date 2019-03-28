import React, {Component} from 'react';
import './App.css';
import product1 from './product2.jpg'
import HomePageGrid from "./product/HomePageGrid";


class App extends Component {
    render() {
        return (
            <div>
                <Content/>
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

                </div>

            </div>
        );
    }
}


export default App;