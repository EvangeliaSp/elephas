import React, {Component} from 'react';
import Footer from "./components/Footer"
import Header from "./components/Header"
import logo from './elephas2.jpg';
import './App.css';

class App extends Component {
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