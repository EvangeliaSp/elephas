import React, {Component} from 'react';
import Avatar from 'react-avatar';

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
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" datapagesize="5">
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
            // {/*<BootstrapTable data={ users } striped hover condensed pagination>*/}
            //     {/*<TableHeaderColumn dataField='idUser' isKey dataAlign="center">Id</TableHeaderColumn>*/}
            //     {/*<TableHeaderColumn dataformat={<Avatar name="Eva Sp" />} dataFormat={ this.imageFormatter } dataAlign="center">Avatar</TableHeaderColumn>*/}
            //     {/*<TableHeaderColumn dataField='firstname' dataAlign="center">Firstname</TableHeaderColumn>*/}
            //     {/*<TableHeaderColumn dataField='lastname' dataAlign="center">Lastname</TableHeaderColumn>*/}
            //     {/*<TableHeaderColumn dataField='email' dataAlign="center">Email</TableHeaderColumn>*/}
            // {/*</BootstrapTable>*/}
        );
    }
}

export default UserList;
