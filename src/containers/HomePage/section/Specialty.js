import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'
import { getTopSpecialtyService } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router'



class Specialty extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount() {
        let res = await getTopSpecialtyService("")
        console.log('check data specialty: ', res)

        this.setState({
            dataSpecialty: res.response.data
        })

    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }

        console.log('HELLO check item: ', item)
    }

    render() {

        let { dataSpecialty } = this.state

        console.log('check state specialty: ', dataSpecialty)

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
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='img-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className='img'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <div className='title-img'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
