
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firtname: '',
            lastname: '',
            phonenumber: '',
            gender: '',
            roleid: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log('check good:', this.state)
        })
    }

    handleAddNewUser = () => {
        this.props.createNewUser(this.state)
        console.log('data modal', this.state)
    }


    render() {
        console.log('check child props', this.props)
        console.log('check child props isOpen', this.props.isOpen)
        let openModal = this.props.isOpen
        return (
            <Modal isOpen={openModal}
                toggle={() => { this.toggle() }}
                size='lg'
                className='Modal-user-container' >
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='container-modal-user'>
                        <form className="form-container">
                            <label htmlFor="email"><b>Email</b></label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                value={this.state.email}
                                type="email" placeholder="Enter Email" name="email" required />

                            <label htmlFor="password"><b>Password</b></label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                value={this.state.password}
                                type="password" placeholder="Enter Password" name="password" required />

                            <label htmlFor="firstname"><b>First Name</b></label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, 'firtname') }}
                                value={this.state.firtname}
                                type="text" placeholder="Enter First Name" name="firtname" required />

                            <label htmlFor="lastname"><b>Last Name</b></label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, 'lastname') }}
                                value={this.state.lastname}
                                type="text" placeholder="Enter Last Name" name="lastname" required />

                            <label htmlFor="phonenumber"><b>Phone Number</b></label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, 'phonenumber') }}
                                value={this.state.phonenumber}
                                type="text" placeholder="Enter Phone Number" name="phonenumber" required />

                            <label htmlFor="gender"><b>Gender</b></label>
                            <select name="gender"
                                onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                                value={this.state.gender}
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>

                            <label htmlFor="roleid"><b>Role</b></label>
                            <select name="roleid"
                                onChange={(event) => { this.handleOnchangeInput(event, 'roleid') }}
                                value={this.state.roleid}
                            >
                                <option value="1">Role 1</option>
                                <option value="2">Role 2</option>
                                <option value="3">Role 3</option>
                            </select>
                        </form>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


