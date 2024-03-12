import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeFooter.scss'



class HomeFooter extends Component {

    render() {


        return (
            <div className='HomeFooter-container'>
                <div className='footer-content'>
                    <div className='footer-title'>
                        &copy; 2024 Booking. All Rights Reserved.
                    </div>
                    <div className='social-icons'>
                        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
