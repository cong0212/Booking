import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { getPatientForDoctor, postSendRemedy } from '../../../services/userService';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay'






class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    componentDidMount() {
        this.getDataPatient()

    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.response && res.response.errCode === 0) {
            this.setState({
                dataPatient: res.response.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorID,
            patientID: item.patientID,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (datachild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemedy({
            email: datachild.email,
            imgBase64: datachild.imgBase64,
            doctorId: dataModal.doctorId,
            patientID: dataModal.patientID,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        })

        if (res && res.response && res.response.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy success');
            this.closeRemedyModal();
            await this.getDataPatient();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('something wrongs...')
        }
    }




    render() {

        let { dataPatient, isOpenRemedyModal, dataModal } = this.state

        console.log('check user props: ', this.props)
        console.log('check state: ', dataPatient)
        console.log('check data modal: ', dataModal)

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='loading ...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Schedule Patient
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Select date</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='çol-12 table-manage-patient'>
                                <table class="custom-table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Time</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataPatient.valueEN}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.genderData.valueEN}</td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Confirm</button>
                                                    </tr>
                                                )
                                            })

                                            :
                                            <tr>no data</tr>
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
