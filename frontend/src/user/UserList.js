import React, {Component} from 'react';
import Avatar from 'react-avatar';
import {Container} from "mdbreact";
import notAvailable from "../notAvailable.jpg";

class UserList extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadUsersFromServer()
    }

    loadUsersFromServer = () => {
        this.setState({isLoading: true});

        fetch('/user/all')
            .then(response => response.json())
            .then(data => this.setState({users: data, isLoading: false}))
    };

    render() {
        const  {users, isLoading} = this.state

        if (users.email != 'admin@gmail.com' && localStorage.getItem("idUser") != null) {
            return (<img className="center" src={notAvailable}/>);
        }

        if (isLoading)
            return <p>Loading...</p>

        return (
            <div>
                {/*<table className="table table-striped table-bordered table-sm" datapagesize="5">*/}
                <Container>
                <table class="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <th scope="row">{user.idUser}</th>
                            <td><Avatar name={user.firstname+" "+user.lastname} round size="35" /></td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Container>
            </div>
        );
    }
}

export default UserList;
