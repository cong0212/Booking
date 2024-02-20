import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router'


import './HomeHeader.scss'



class HomeHeaderPage extends Component {


    goHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {


        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i class="fas fa-bars"></i>
                            <div className='Header-logo' onClick={() => this.goHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='ChildContent'>
                                Tất cả
                            </div>
                            <div className='ChildContent'>
                                Tại nhà
                            </div>
                            <div className='ChildContent'>
                                Tại viện
                            </div>
                            <div className='ChildContent'>
                                Sống khỏe
                            </div>
                            <div className='SearchInput'>
                                <input className='Input' placeholder='Search'></input>
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='schedule'>
                                <i class="fas fa-history"></i>
                                <span>Lịch hẹn</span>
                            </div>
                            <div className='Support'>
                                <i class="fas fa-phone-volume"></i>
                                <span>Hỗ trợ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='home-header-banner-img'></div>
                    </div>
                }


            </React.Fragment>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeaderPage));
