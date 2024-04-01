import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDetailSchedule.scss';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import ProfileDoctor from '../../Patient/Doctor/ProfileDoctor';
import DoctorScheduleAdmin from './DoctorScheduleAdmin';


// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';




class ManageDetailSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ListSpecialty: [],
            currentDate: '',
            rangeTime: [],
            arrDoctorId: [],
            allAvalablelTime: [],
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.fetchRequiredDoctorInfor();

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resSpecialty } = this.props.allRequiredDoctorInfor;

            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')


            this.setState({
                ListSpecialty: dataSelectSpecialty
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }


    }


    handleOnchangeDatePicker = async (date) => {

        this.setState({
            currentDate: date[0]
        })


    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id
                    result.push(object)
                })
            }


        }

        return result;
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );

        let res = await getDetailSpecialtyById({
            id: selectedOption.value,
            location: 'ALL'
        });

        if (res && res.response && res.response.errCode === 0) {
            let data = res.response.data;
            let arrDoctorId = [];
            if (data && !_.isEmpty(res.response.data)) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorID)
                    })
                }
            }



            this.setState({

                arrDoctorId: arrDoctorId,

            })
        }

        console.log('FUCKKKK check doctor: ', res)

    };





    render() {
        console.log('check state detail schedule:', this.state)
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        let { arrDoctorId, currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();
        console.log('check date: ', formatedDate)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <span>Chi tiết lịch khám</span>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn chuyên khoa</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.ListSpecialty}
                                placeholder={'Select Specialty'}
                                name='selectSpecialty'
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div class="container">
                            <div className='circle'>
                                <div className="green"></div>
                                <div className="text">Lịch hẹn đã hoàn thành</div>
                            </div>
                            <div className='circle'>
                                <div className="yellow"></div>
                                <div className="text">Đã xác nhận lịch hẹn</div>
                            </div>
                            <div className='circle'>
                                <div className="red"></div>
                                <div className="text">Chưa xác nhận lịch hẹn</div>
                            </div>
                        </div>


                        <div className='col-12 table-schedule-detail'>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <th>Schedule</th>
                                    </tr>

                                    {arrDoctorId && arrDoctorId.length > 0 &&
                                        arrDoctorId.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <ProfileDoctor
                                                            doctorId={item}
                                                            isShowDescriptionDoctor={false}
                                                            isShowLinkDetail={false}
                                                            isShowPrice={false}
                                                        // dataTime={dataTime}
                                                        />
                                                    </td>

                                                    <td>
                                                        <div class="time-slots">
                                                            <DoctorScheduleAdmin
                                                                doctorIdFromParent={item}
                                                                dateFromParent={formatedDate}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }




                                </tbody>
                            </table>
                        </div>





                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        saveDetailDoctorsStart: (data) => dispatch(actions.saveDetailDoctorsStart(data)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailSchedule);
