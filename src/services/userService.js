import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const CreateNewUsersService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const DeleteNewUsersService = (id) => {
    return axios.delete('/api/delete-a-user', {
        data: {
            id: id
        }
    });
}

const EditUsersService = (data) => {
    return axios.put('/api/edit-a-user', data)
}

const getAllCodeService = (data) => {
    return axios.get(`/api/get-all-codes?type=${data}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctors?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

export {
    handleLoginApi, getAllUsers,
    CreateNewUsersService, DeleteNewUsersService,
    EditUsersService, getAllCodeService, getAllDoctorService,
    saveDetailDoctor, getDetailInforDoctor, saveBulkScheduleDoctor,
    getTopDoctorService
}
