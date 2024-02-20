import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import TableManageUser from './TableManageUser';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { selectFilter } from 'react-bootstrap-table2-filter';

class UserRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firtname: '',
            lastname: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            roleid: '',

            action: '',
            userEditId: '',
            avatar: ''
        }
    }

    async componentDidMount() {

        this.props.getGenderstart();
        this.props.getPositionstart();
        this.props.getRolestart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('check gender', res)
        // } catch (e) {
        //     console.log(e)
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                roleid: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firtname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                roleid: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
                avatar: '',
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.CreateNewUser({
                email: this.state.email,
                password: this.state.password,
                firtname: this.state.firtname,
                lastname: this.state.lastname,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleid: this.state.roleid,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.EditUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firtname: this.state.firtname,
                lastname: this.state.lastname,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleid: this.state.roleid,
                avatar: this.state.avatar,
                position: this.state.position
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firtname',
            'lastname', 'phonenumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('input required: ' + arrCheck[i])
                break;
            }
        }

        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {
            console.log('check onchange', this.state)
        })


    }

    handleEditUserFromParent = (data) => {
        let imageBase64 = '';
        if(data.image){
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }
        console.log('check edit user from parent:', data)
        this.setState({
            email: data.email,
            password: 'cong02',
            firtname: data.firstName,
            lastname: data.lastName,
            phonenumber: data.phonenumber,
            address: data.address,
            gender: data.gender,
            position: data.positionID,
            roleid: data.roleID,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: data.id
        })
    }


    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }

    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }


    render() {
        console.log('cong02', this.props.genderRedux)

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isLoadingGender = this.props.isLoadingGender;

        let { email, password, firtname,
            lastname, phonenumber, address,
            gender, position, roleid } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Quản lí người dùng
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div>{isLoadingGender === true ? 'loading gender' : ''}</div>
                            <div className='col-12 mb-3'><b>Thêm mới người dùng</b></div>
                            <div className='col-6'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Password</label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Firstname</label>
                                <input className='form-control' type='text'
                                    value={firtname}
                                    onChange={(event) => { this.onChangeInput(event, 'firtname') }}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Lastname</label>
                                <input className='form-control' type='text'
                                    value={lastname}
                                    onChange={(event) => { this.onChangeInput(event, 'lastname') }}
                                ></input>
                            </div>
                        </div>
                        <div className='row'>

                            <div className='col-3'>
                                <label>Phonenumber</label>
                                <input className='form-control' type='text'
                                    value={phonenumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}
                                ></input>
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                ></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-3">
                                <label for="inputState">Gender</label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueEN}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputState">Position</label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueEN}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputState">RoleID</label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'roleid') }}
                                    value={roleid}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueEN}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => { this.handleOnchangeImage(event) }}
                                    ></input>
                                    <label htmlFor='previewImg' className='lable-upload'>
                                        Upload image
                                        <i class="fa-solid fa-arrow-up-from-bracket" />
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => { this.openPreviewImage() }}
                                    >
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning px-3' : 'btn btn-primary px-3'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 'Save' : 'Create'}</button>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }



            </div>


        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderstart: () => dispatch(actions.fetchGenderStart()),
        getPositionstart: () => dispatch(actions.fetchPositionStart()),
        getRolestart: () => dispatch(actions.fetchRoleStart()),
        CreateNewUser: (data) => dispatch(actions.CreateNewUser(data)),
        EditUser: (data) => dispatch(actions.EditUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
