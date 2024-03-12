import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './About.scss'



class About extends Component {

    render() {


        return (
            <div className='About-container'>
                <div class='video-container'>
                    <iframe width='560' height='315' src='https://www.youtube.com/embed/zoEtcR5EW08' frameborder='0' allowfullscreen></iframe>
                </div>
                <div class='text-container'>
                    <p>1 unfinished product, completed in 3 months</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
