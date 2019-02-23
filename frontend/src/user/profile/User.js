import React, {Component} from 'react';

class User extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            users: this.loadUserFromServer.data
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
        fetch('/user/findById/:id=59')
            .then(response => response.json())
            .then(data => this.setState({user: data}))
    };

    render() {
        return (
            <div>
            <tr>{this.props.user}</tr>
            {/*<tr key={this.props.user.id}>*/}
                {/*<td>{this.props.user.email}</td>*/}
                {/*<td>{this.props.user.firstname}</td>*/}
                {/*<td>{this.props.user.lastname}</td>*/}
                {/*<td>{this.props.user.streetName}</td>*/}
                {/*<td>{this.props.user.streetNumber}</td>*/}
                {/*<td>{this.props.user.zipCode}</td>*/}
                {/*<td>{this.props.user.country}</td>*/}
                {/*<td>{this.props.user.telephone}</td>*/}

                {/*/!*<td><button className="btn btn-danger btn-xs" onClick={this.deleteUser}>Delete</button></td>*!/*/}
            {/*</tr>*/}
            </div>
        );
    }
}

export default User;