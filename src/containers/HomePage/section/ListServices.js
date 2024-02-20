import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specailty from "../../../assets/images/specialty/161905-iconkham-chuyen-khoa.png"


import './ListService.scss'



class ListServices extends Component {

    render() {


        return (
            <div className='list-service-container'>
                <div className='list-service-header'>Dịch vụ toàn diện</div>
                <div className='list-sevice-body'>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                    <div className='service-item'>
                        <div className='service-item-icon'>
                            <img src={specailty} />
                        </div>
                        <span className='service-item-center'> khám chuyên khoa</span>
                    </div>
                </div>
            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListServices);
