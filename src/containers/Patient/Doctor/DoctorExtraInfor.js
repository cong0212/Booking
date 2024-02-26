import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeaderPage from '../../HomePage/HomeHeaderPage';
import './DoctorExtraInfor.scss';
import { getExtraDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format'





class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraDoctorById(this.props.doctorIdFromParent);

            console.log('check ifor extra doctor: ', res.response)

            if (res && res.response.errCode === 0) {
                this.setState({
                    extraInfor: res.response.data
                })
            }
        }

    }

    handleShowHideDetailDoctor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {

        console.log('check state infor extra: ', this.state.extraInfor)

        let { isShowDetailInfor, extraInfor } = this.state
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='title-up'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='address-clinic'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='title-hide'>GIÁ KHÁM:
                            {extraInfor && extraInfor.priceTypeData
                                &&
                                <NumberFormat
                                    value={extraInfor.priceTypeData.valueEN}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                            <span className='show-hide' onClick={() => this.handleShowHideDetailDoctor(true)}>Xem chi tiet</span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <div className='title-show'>
                            <div className='show-body'>
                                <span className='left'>Giá khám</span>
                                <span className='right'>
                                    {extraInfor && extraInfor.priceTypeData
                                        &&
                                        <NumberFormat
                                            value={extraInfor.priceTypeData.valueEN}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    }
                                </span>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='hide-body'>
                                <span className='show-hide' onClick={() => this.handleShowHideDetailDoctor(false)}>An bang gia</span>
                            </div>

                        </div>
                    }


                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
