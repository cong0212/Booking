import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay'






class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorID: '',
            genders: '',
            timeType: '',
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueEN;
                object.value = item.keyMap;
                result.push(object)
            })
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorID = this.props.dataTime.doctorID;
                let timeType = this.props.dataTime.timeType;
                console.log('check doctorid: ', doctorID)
                this.setState({
                    doctorID: doctorID,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueEn
            let date = moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                `${time} - ${date}`
            )
        }

        return ''
    }

    buidNameDoctor = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;
        }

        return ''
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buidNameDoctor(this.props.dataTime)
        this.setState({
            isShowLoading: true,
        })


        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorID: this.state.doctorID,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName
        })

        console.log('check res booking: ', res)

        if (res && res.response && res.response.errCode === 0) {
            this.setState({
                isShowLoading: false,
            })
            toast.success('Booking success')
            this.props.closeBookingModal();
        } else {
            toast.error('fail booking error')
        }
    }

    render() {

        console.log('check gender: ', this.props.genders)
        console.log('checl data time: ', this.props.dataTime)
        console.log('check state: ', this.state)

        let { isOpenModal, closeBookingModal, dataTime, isShowPrice } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorID
        }
        console.log('check data tiem from parent: ', dataTime)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='loading ...'
                >
                    <Modal
                        isOpen={isOpenModal}
                        className={'booking-modal-container'}
                        size='lg'
                        centered
                    >

                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'>Medical appointment scheduling information</span>
                                <span className='right'
                                    onClick={closeBookingModal}
                                >
                                    <i className="fas fa-times"></i>
                                </span>
                            </div>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className='booking-modal-body'>
                                <div className='doctor-infor'>

                                </div>

                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label>Name</label>
                                        <input className='form-control'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Phone</label>
                                        <input className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Address</label>
                                        <input className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Birthday</label>
                                        <DatePicker
                                            onChange={this.handleOnchangeDatePicker}
                                            className='form-control'
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Email</label>
                                        <input className='form-control'
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Reason</label>
                                        <input className='form-control'
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Gender</label>

                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='booking-modal-footer'>
                                <button className='btn-booking-confirm'
                                    onClick={() => this.handleConfirmBooking()}
                                >
                                    Comfirm
                                </button>
                                <button className='btn-booking-cancel'
                                    onClick={closeBookingModal}
                                >
                                    cancel
                                </button>
                            </div>
                        </div>

                    </Modal>
                </LoadingOverlay>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
