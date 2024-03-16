import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';







class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }

    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.response.errCode === 0) {
                result = res.response.data
            }
        }

        console.log('check result profile: ', result)

        return result
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueEn
            let date = moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Free booking</div>
                </>
            )
        }
    }

    render() {

        let { dataProfile } = this.state
        let { isShowDescriptionDoctor, dataTime, isShowLinkDetail, doctorId, isShowPrice } = this.props
        let name = '';
        if (dataProfile && dataProfile.positionData) {
            name = `${dataProfile.positionData.valueEN}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        console.log('check state profile doctor: ', dataProfile)


        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {name}
                        </div>
                        {isShowDescriptionDoctor === true ?
                            <>
                                <div className='down'>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </div>
                            </>
                            :
                            <>
                                {this.renderTimeBooking(dataTime)}
                            </>
                        }

                    </div>



                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }

                {isShowPrice === true &&
                    <div className='price'>GIÁ KHÁM:
                        {dataProfile && dataProfile.DoctorInfor && dataProfile.DoctorInfor.priceTypeData
                            &&
                            <NumberFormat
                                value={dataProfile.DoctorInfor.priceTypeData.valueEN}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>

                }


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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
