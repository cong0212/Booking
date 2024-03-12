import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
import _, { every } from 'lodash';
import { CommonUtils } from '../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'





class RemedyModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }




    render() {

        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
        console.log('check state modal: ', this.state)

        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='md'
                centered
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Send Success</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>

                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chose file</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            >
                            </input>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button color='primary' onClick={() => this.handleSendRemedy()}>Send</button>{'  '}
                    <button color='secondary' onClick={closeRemedyModal}>Cancle</button>
                </ModalFooter>

            </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
