import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'



class Specialty extends Component {

    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <div className='specialty-content-header'>
                        <span className='title-section'>Chuyên khoa</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'>Cơ xương khớp</div>
                            </div>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img'></div>
                                <div className='title-img'></div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
