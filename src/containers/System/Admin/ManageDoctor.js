import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { CRUD_ACTIONS, languages } from '../../../utils';
import { getDetailInforDoctor } from "../../../services/userService"



// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save infor doctor table
            ListPrice: [],
            ListPayment: [],
            ListLProvince: [],
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.fetchRequiredDoctorInfor();

    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.lastName} ${item.firstName}`;
                    object.value = item.id

                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.valueEN}`;
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.valueEN} USD`;
                    object.value = item.keyMap
                    result.push(object)
                })
            }


        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            console.log('check select option: ', dataSelectPrice)

            this.setState({
                ListPrice: dataSelectPrice,
                ListPayment: dataSelectPayment,
                ListLProvince: dataSelectProvince
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }



    handleChange = async (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
        let { ListPayment, ListLProvince, ListPrice } = this.state
        let res = await getDetailInforDoctor(selectedOption.value);
        console.log('check doctor: ', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description && res.data.Markdown.contentHTML) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectPayment = '',
                selectPrice = '', selectProvince = '';

               

            if (res.data.DoctorInfor) {
                addressClinic = res.data.DoctorInfor.addressClinic;
                nameClinic = res.data.DoctorInfor.nameClinic;
                note = res.data.DoctorInfor.note;
                paymentId = res.data.DoctorInfor.paymentID;
                priceId = res.data.DoctorInfor.priceID;
                provinceId = res.data.DoctorInfor.provinceID;


                selectPayment = ListPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectPrice = ListPrice.find(item => {
                    return item && item.value === priceId
                })

                selectProvince = ListLProvince.find(item => {
                    return item && item.value === provinceId
                })

               
            }


            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectPayment: selectPayment,
                selectPrice: selectPrice,
                selectProvince: selectProvince
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                addressClinic: '',
                nameClinic: '',
                note: '',
                selectPayment: '',
                selectPrice: '',
                selectProvince: ''
            })
        }
        console.log("markdown:", res)

    };


    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctorsStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
        console.log('markdown: ', this.state)
    }

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleSelectChangeDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        console.log('check name: ', stateName)
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }




    render() {
        let { hasOldData } = this.state;
        console.log('list doctor:', this.state.listDoctors)
        console.log('check required all doctor: ', this.props.allRequiredDoctorInfor)

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctor
                </div>
                <div className='intro-infor'>
                    <div className='content-left form-group' >
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={'Select Doctors'}

                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => { this.handleChangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>

                </div>
                <div className='more -infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chon gia</label>
                        <Select
                            value={this.state.selectPrice}
                            onChange={this.handleSelectChangeDoctorInfor}
                            options={this.state.ListPrice}
                            placeholder={'chon gia'}
                            name='selectPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chon phuong thuc thanh toan</label>
                        <Select
                            value={this.state.selectPayment}
                            onChange={this.handleSelectChangeDoctorInfor}
                            options={this.state.ListPayment}
                            placeholder={'Chon phuong thuc thanh toan'}
                            name='selectPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chon tinh thanh</label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleSelectChangeDoctorInfor}
                            options={this.state.ListLProvince}
                            placeholder={'Chon tinh thanh'}
                            name='selectProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ten phong kham</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Dia chi phong kham</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'note')}
                            value={this.state.note}
                        ></input>
                    </div>
                </div>
                <div className='manage-doctor-edit'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>

                <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        saveDetailDoctorsStart: (data) => dispatch(actions.saveDetailDoctorsStart(data)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
