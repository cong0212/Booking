import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeaderPage';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeFooter from '../../HomePage/HomeFooter';
import BookingModal from '../Doctor/Modal/BookingModal';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';







class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectProvince: '',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            console.log('check id specialty: ', id)

            let resProvince = await getAllCodeService('PROVINCE');
            console.log('check province: ', resProvince)
            console.log('check detail specialty: ', res)

            if (res && res.response && res.response.errCode === 0 && resProvince && resProvince.errCode === 0) {
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

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEN: 'ALL',
                        valueVI: 'Toan quoc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.response.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
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
                    dataDetailSpecialty: res.response.data,
                    arrDoctorId: arrDoctorId,
                    selectProvince: event.target.value
                })

            }

        }
    }


    render() {
        let { arrDoctorId, listProvince, dataDetailSpecialty } = this.state
        console.log(' ALO check state detail specialty: ', this.state)

        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div
                                dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                            ></div>
                        }
                    </div>
                    <div className='specialty-list-doctor'>
                        <div className='search-sp-doctor'>
                            <select
                                onChange={(event) => this.handleOnchangeSelect(event)}
                            >
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {item.valueEN}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='detail-specailty-body'>

                            {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return (
                                        <div className='each-doctor' key={index}>
                                            <div className='dt-content-left'>
                                                <div className='profile-doctor'>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescriptionDoctor={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
                                                    // dataTime={dataTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className='dt-content-right'>
                                                <div className='doctor-schedule'>
                                                    <DoctorSchedule
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                                <div className='doctor-extra-infor'>
                                                    <DoctorExtraInfor
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                               
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
