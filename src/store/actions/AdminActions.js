import actionTypes from './actionTypes';
import { getAllCodeService, CreateNewUsersService, getAllUsers, DeleteNewUsersService, EditUsersService, getAllDoctorService, saveDetailDoctor, getTopDoctorService, getTopSpecialtyService } from '../../services/userService';
import { dispatch } from '../../redux';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPosiotionStart error', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchPosiotionStart error', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const CreateNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateNewUsersService(data)
            toast.success("Create user success!")
            if (res && res.errCode === 0) {
                dispatch(CreateNewUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(CreateNewUserFailed());
            }
        } catch (e) {
            dispatch(CreateNewUserFailed());
        }
    }
}

export const CreateNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})

export const CreateNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})





export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            console.log('cong0212 all user redux :', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService("")
            console.log('cong0212 all user redux :', res)
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed());
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: data
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})



export const DeleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteNewUsersService(id)
            toast.success("Delete user success!")
            if (res && res.errCode === 0) {
                dispatch(DeleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(DeleteUserFailed());
            }
        } catch (e) {
            dispatch(DeleteUserFailed());
        }
    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})

export const DeleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const EditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await EditUsersService(data)
            console.log('check data update', data)
            toast.success("Updated user success!")
            if (res && res.errCode === 0) {
                dispatch(EditUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(EditUserFailed());
            }
        } catch (e) {
            dispatch(EditUserFailed());
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService()
            console.log('cong0212 all user redux :', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
        }
    }
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: data
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})



export const saveDetailDoctorsStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data)
            if (res && res.errCode === 0) {
                toast.success("Save detail doctor success!")
                dispatch(saveDetailDoctorsSuccess())
            } else {
                toast.error("Missing parameter!")
                dispatch(saveDetailDoctorsFailed());
            }
        } catch (e) {
            dispatch(saveDetailDoctorsFailed());
        }
    }
}

export const saveDetailDoctorsSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorsFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})



export const fetchAllScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            console.log('cong0212 all user redux :', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data))
            } else {
                dispatch(fetchAllScheduleTimeFailed());
            }
        } catch (e) {
            dispatch(fetchAllScheduleTimeFailed());
        }
    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
})

export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED
})


export const fetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTORLL_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getTopSpecialtyService('')
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.response && resSpecialty.response.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.response.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredStart error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTORLL_INFOR_SUCCESS,
    data: data
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTORLL_INFOR_FAIDED
})


