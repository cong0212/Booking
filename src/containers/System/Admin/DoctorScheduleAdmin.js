import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeaderPage from '../../HomePage/HomeHeaderPage';
import './DoctorScheduleAdmin.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';







class DoctorScheduleAdmin extends Component {

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
       
    }

    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent || this.props.dateFromParent !== prevProps.dateFromParent) {
            let date = this.props.dateFromParent
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, date);
            this.setState({
                allAvalablelTime: res.response.data ? res.response.data : []
            })

          
            console.log(' check time: ', res)
            console.log('check date from parent: ', this.props.dateFromParent)


        }
    }

   
   

   
    render() {


        
        let { allDays, allAvalablelTime, isOpenModalBooking, dataScheduleModal } = this.state

       


        return (
            <>
                <div className='doctor-schedule-container-admin'>
                    <div className='all-time'>
                        
                        <div className='time-content'>
                            {allAvalablelTime && allAvalablelTime.length > 0 ?
                                allAvalablelTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData.valueEn;
                                    let buttonClass = '';

                                    // Duyệt qua mỗi phần tử trong mảng bookingData
                                    item.bookingData.forEach((bookingItem) => {
                                        if (bookingItem.timeType === item.timeType && bookingItem.date === item.date) {
                                            switch (bookingItem.statusID) {
                                                case 'S3':
                                                    buttonClass = 'green';
                                                    break;
                                                case 'S2':
                                                    buttonClass = 'yellow';
                                                    break;
                                                case 'S1':
                                                    buttonClass = 'red';
                                                    break;
                                                default:
                                                    buttonClass = '';
                                            }
                                        }
                                    });

                                    return (
                                        <button key={index}
                                            className={buttonClass}
                                            // onClick={() => this.handleClickScheduleTime(item)}
                                        >{timeDisplay}</button>
                                    )
                                })
                                :
                                <div>not data</div>
                            }

                        </div>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorScheduleAdmin);
