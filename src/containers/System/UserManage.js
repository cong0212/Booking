import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, CreateNewUsersService, DeleteNewUsersService, EditUsersService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isopenModalUser: false,
            isopenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        console.log(response)
    }

    createNewUser = async (data) => {
        try {
            let response = await CreateNewUsersService(data)
            if (response && response.errCode === 0) {
                await this.getAllUsers();
                this.setState({
                    isopenModalUser: false
                })
            } else {
                alert(response.errMessage)
            }
            console.log(response)
        } catch (e) {
            console.log(e)
        }

    }

    handleAddNewUser = () => {
        this.setState({
            isopenModalUser: true
        })
    }

    handleDeleteUser = async (data) => {
        try {
            let response = await DeleteNewUsersService(data.id)
            if (response && response.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(response.errCode)
            }
            console.log(response)
        } catch (e) {
            console.log(e)
        }
        console.log(data)
    }

    handleEditUser = (user) => {
        console.log('check edit user: ', user)
        this.setState({
            isopenModalEditUser: true,
            userEdit: user
        })
    }

    editUser = async (user) => {
        let response = await EditUsersService(user)
        if (response && response.errCode === 0) {
            this.setState({
                isopenModalEditUser: false
            })

            await this.getAllUsers()
        } else {
            alert(response.errCode)
        }
        console.log(response)
    }

    toggleUserModal = () => {
        this.setState({
            isopenModalUser: false
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isopenModalEditUser: false
        })
    }


    render() {

        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isopenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isopenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isopenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }

                <div className='title text-center'>
                    Manage users
                </div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        Add new users
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Action</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => { this.handleEditUser(item) }}
                                            ><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => { this.handleDeleteUser(item) }}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
