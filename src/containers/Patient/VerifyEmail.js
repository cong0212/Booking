import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import HomeHeader from '../HomePage/HomeHeaderPage';
import { postVerifyBookAppointment } from '../../services/userService';






class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorID = urlParams.get('doctorID');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorID: doctorID
            })

            console.log('check res verify: ', res.response)
            console.log('check res verify: ', res.response.errCode)

            if (res && res.response && res.response.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.response.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.response ? res.errCode : -1
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            loading data ....
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'>Appointment confirmed successfully</div>
                                :
                                <div className='infor-booking'>This appointment already exists</div>
                            }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
