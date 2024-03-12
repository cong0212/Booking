import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeaderPage from '../../HomePage/HomeHeaderPage';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';






class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalablelTime: [],
            isOpenModalBooking: false,
            dataScheduleModal: {}
        }
    }

    async componentDidMount() {
        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'))
        this.setArrDays();
    }

    setArrDays = () => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object)
        }

        this.setState({
            allDays: allDays,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.state.allDays
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalablelTime: res.response.data ? res.response.data : []
            })

            console.log('check id, date: ', this.props.doctorIdFromParent, allDays[0].value)
            console.log(' check time: ', res)


        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check res schdule : ', res)

            if (res.response && res.response.errCode === 0) {
                this.setState({
                    allAvalablelTime: res.response.data
                })
            }



        }

        console.log('check res time all : ', this.state)


    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {

        console.log('check all day state: ', this.state)
        let { allDays, allAvalablelTime, isOpenModalBooking, dataScheduleModal } = this.state



        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-time'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar"></i>
                            <span>schedule</span>
                        </div>
                        <div className='time-content'>
                            {allAvalablelTime && allAvalablelTime.length > 0 ?
                                allAvalablelTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData.valueEn;

                                    return (
                                        <button key={index}
                                            onClick={() => this.handleClickScheduleTime(item)}
                                        >{timeDisplay}</button>
                                    )
                                })
                                :
                                <div>not examination schedule</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal = {this.closeBookingModal}
                    dataTime = {dataScheduleModal}
                />
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
