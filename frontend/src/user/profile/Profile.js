import React, { Component } from 'react'
import Avatar from 'react-avatar';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import "react-tabs/style/react-tabs.css";
import './Profile.css'

// import UserProfile from 'react-user-profile'

class Profile extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: '',
            key: 'profile',
        };
    }

    componentDidMount() {
        this.loadUserFromServer()
    }

    loadUserFromServer = () => {
        const { id } = this.props.match.params
        fetch(`/user/findById/${id}`)
            .then(response => response.json())
            .then(data => this.setState({user: data}))
    };

    render() {
        const  {user, key} = this.state

        return (
            <div>
            <Header/>
            <div id="user-profile-2" className="user-profile">
                <div className="tabbable">
                    <ul className="nav nav-tabs padding-18">
                        <li className="active">
                            <a data-toggle="tab" href="#home">
                                <i className="green ace-icon fa fa-user bigger-120"></i>
                                Profile
                            </a>
                        </li>

                        <li>
                            <a data-toggle="tab" href="#pictures">
                                <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                                Orders
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content no-border padding-24">
                        <div id="home" className="tab-pane in active">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 center">
                        <span className="profile-picture">
                            <Avatar className="editable img-responsive" alt=" Avatar" id="avatar2" name={user.firstname+' '+user.lastname} size="150"/>
                        </span>

                                    <div className="space space-4"></div>

                                </div>

                                <div className="col-xs-12 col-sm-9">
                                    <h4 className="blue">
                                        <span className="middle">{user.firstname+' '+user.lastname} </span>

                                    </h4>

                                    <div className="profile-user-info">
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Email</div>

                                            <div className="profile-info-value">
                                                <span>{user.email}</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Location</div>

                                            <div className="profile-info-value">
                                                {/*<i className="fa fa-map-marker light-orange bigger-110"></i>*/}
                                                <span>{user.city}</span>
                                                <span>{user.country}</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Address</div>

                                            <div className="profile-info-value">
                                                {/*<i className="fa fa-map-marker light-orange bigger-110"></i>*/}
                                                <span>{user.streetName}</span>
                                                <span>{user.streetNumber}</span>
                                                <span>{user.zipCode}</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Telephone</div>

                                            <div className="profile-info-value">
                                                <span>{user.telephone}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="space-20"></div>

                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="widget-box transparent">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="pictures" className="tab-pane">
                            <ul className="ace-thumbnails">
                                <li>
                                    <a href="#" data-rel="colorbox">
                                        <img alt="150x150" src="http://lorempixel.com/200/200/nature/1/"/>
                                        <div className="text">
                                            <div className="inner">Sample Caption on Hover</div>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>
            </div>

        );
    }
}

export default Profile