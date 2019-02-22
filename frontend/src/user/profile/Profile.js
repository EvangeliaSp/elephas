import React, { Component } from 'react'
import Avatar from 'react-avatar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './Profile.css'

// import UserProfile from 'react-user-profile'

class Profile extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'profile',
        };
    }

    render() {
        // const photo = 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599'
        // const userName = 'Harvey Specter'
        // const location = 'New York, USA'

        // const comments = [
        //     {
        //         id: '1',
        //         photo: 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599',
        //         userName: 'Mike Ross',
        //         content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. ',
        //         createdAt: 1543858000000
        //     }
        // ]

        return (
            <div>
            {/*<Header/>*/}
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="profile" title="Profile">

                    </Tab>
                    <Tab eventKey="contact" title="Orders" disabled>

                    </Tab>
                </Tabs>

            {/*<Footer/>*/}
            </div>

        );
    }
}

export default Profile