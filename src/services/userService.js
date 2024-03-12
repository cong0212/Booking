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

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appoinment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appoinment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}

const getTopSpecialtyService = (limit) => {
    return axios.get(`/api/get-top-specialty?limit=${limit}`)
}

export {
    handleLoginApi, getAllUsers,
    CreateNewUsersService, DeleteNewUsersService,
    EditUsersService, getAllCodeService, getAllDoctorService,
    saveDetailDoctor, getDetailInforDoctor, saveBulkScheduleDoctor,
    getTopDoctorService, getScheduleDoctorByDate, getExtraDoctorById,
    getProfileDoctorById, postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getPatientForDoctor, postSendRemedy,getTopSpecialtyService
}

