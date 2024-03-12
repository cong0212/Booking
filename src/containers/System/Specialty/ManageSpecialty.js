import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageSpecialty.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { CRUD_ACTIONS, CommonUtils, languages } from '../../../utils';
import { every } from 'lodash';

import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);







class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {


    }



    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.response && res.response.errCode === 0) {
            toast.success('Add new success')
        } else {
            toast.error('fail')
        }

        console.log('check res specialty: ', res)
    }



    render() {
        console.log('check state specialty', this.state)

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quan li chuyen khoa</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Ten chuyen khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh chuyen khoa</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button
                            className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Save</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
