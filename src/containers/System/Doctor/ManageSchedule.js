import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { saveBulkScheduleDoctor } from '../../../services/userService'






class Doctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.fetchAllScheduleTimeStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            console.log('check data: ', data)
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.lastName} ${item.firstName}`
                object.value = item.id

                result.push(object)
            })

        }

        return result;
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        console.log('check time: ', time)
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let result = [];
        let { rangeTime, selectedOption, currentDate } = this.state;
        if (!currentDate) {
            toast.error("Invalid date !")
            return;
        }
        if (!selectedOption && _.isEmpty(selectedOption)) {
            toast.error("Invalid Doctor !")
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorID = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                })

            } else {
                toast.error("Invalid time !")
                return;
            }

        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorID: selectedOption.value,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            toast.success('save schedule succcess!')
        } else {
            toast.error('save fail schedule')
        }

        console.log('save bulk check: ', res)

        console.log('check selectedtime state: ', result)

    }




    render() {
        console.log('scheduletime check state: ', this.state.rangeTime)
        let { rangeTime } = this.state

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <span>Tạo lịch khám bệnh</span>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}

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
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.valueVI}
                                        </button>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <button className='btn btn-primary'
                        onClick={() => this.handleSaveSchedule()}
                    >
                        Save
                    </button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchAllScheduleTimeStart: () => dispatch(actions.fetchAllScheduleTimeStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
