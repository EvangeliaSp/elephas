import React, {Component} from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        this.props.deleteUser(this.props.user);
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.firstname}</td>
                <td>{this.props.user.lastname}</td>
                <td>{this.props.user.email}</td>
                {/*<td><button className="btn btn-danger btn-xs" onClick={this.deleteUser}>Delete</button></td>*/}
            </tr>
        );
    }
}

export default User;