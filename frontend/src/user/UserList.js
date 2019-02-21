import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class UserList extends Component<{}, any> {

    state = {};

    constructor(props: any) {
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

        if (isLoading)
            return <p>Loading...</p>

        return (
            <BootstrapTable data={ users } striped hover condensed pagination>
                <TableHeaderColumn dataField='idUser' isKey dataAlign="center">ID</TableHeaderColumn>
                <TableHeaderColumn dataField='firstname' dataAlign="center">Firstname</TableHeaderColumn>
                <TableHeaderColumn dataField='lastname' dataAlign="center">Lastname</TableHeaderColumn>
                <TableHeaderColumn dataField='email' dataAlign="center">Email</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default UserList;
