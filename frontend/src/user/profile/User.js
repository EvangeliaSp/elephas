import React, {Component} from 'react';

class User extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        // this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        this.props.deleteUser(this.props.user);
    }

    componentDidMount() {
        this.loadUserFromServer()
    }

    loadUserFromServer = () => {
        fetch('/user/findById/:id')
            .then(response => response.json())
            .then(data => this.setState({user: data}))
    };

    render() {
        return (
            <tr>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.firstname}</td>
                <td>{this.props.user.lastname}</td>
                <td>{this.props.user.streetName}</td>
                <td>{this.props.user.streetNumber}</td>
                <td>{this.props.user.zipCode}</td>
                <td>{this.props.user.country}</td>
                <td>{this.props.user.telephone}</td>

                {/*<td><button className="btn btn-danger btn-xs" onClick={this.deleteUser}>Delete</button></td>*/}
            </tr>
        );
    }
}

export default User;