import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeaderPage from '../../HomePage/HomeHeaderPage';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';




class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DetailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    DetailDoctor: res.data
                })
            }
        }
    }

    render() {

        console.log('check state detail doctor: ', this.state)

        let { DetailDoctor } = this.state;
        let name = '';
        if (DetailDoctor && DetailDoctor.positionData) {
            name = `${DetailDoctor.positionData.valueEN}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeaderPage
                    isShowBanner={false}
                />

                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${DetailDoctor && DetailDoctor.image ? DetailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {name}
                            </div>
                            <div className='down'>
                                {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {DetailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>

                </div>

                <div className='detail-infor-doctor'>
                    {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.contentHTML
                        &&
                        <div dangerouslySetInnerHTML={{ __html: DetailDoctor.Markdown.contentHTML }}>

                        </div>
                    }
                </div>

                <div className='comment-doctor'></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
