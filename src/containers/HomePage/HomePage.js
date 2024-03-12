import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeaderPage from './HomeHeaderPage';
import Specialty from './section/Specialty'
import ListServices from './section/ListServices';
import Facility from './section/Facility';
import Doctors from './section/Doctors';
import About from './section/About';
import HomeFooter from './HomeFooter';




class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeaderPage isShowBanner={true} />
                <ListServices />
                <Specialty />
                <Facility />
                <Doctors />
                <About/>
                <HomeFooter/>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
