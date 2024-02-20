import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './TableManageUser.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (data) => {
        this.props.deleteUserRedux(data.id)
    }

    handleEditUser = (data) => {
        console.log('check fill edit', data)
        this.props.handleEditUserFromParent(data)
    }

    render() {
        console.log('checl all  user:', this.props.listUsers)
        console.log('checl all state user:', this.state.usersRedux)
        let arrUsers = this.state.usersRedux
        return (
            <React.Fragment>
                <div className="user-container">
                    <div className='title text-center'>
                        Manage users
                    </div>
                    <div className='users-table mt-3 mx-1'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>

                                {arrUsers && arrUsers.length > 0 &&
                                    arrUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
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
               
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.DeleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
