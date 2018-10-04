import axios from 'axios';

export const GET_PROFILE = "GET_PROFILE";
export const CREATE_PROFILE = "CREATE_PROFILE";
export const ADD_EXPERIENCE = "ADD_EXPERIENCE";
export const ADD_EDUCATION = "ADD_EDUCATION";
export const DELETE_EDUCATION = "DELETE_EDUCATION";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const ALL_PROFILES = "ALL_PROFILES";

export const getProfile = () => {
    return dispatch => {
        axios.get('/api/profile/', {
            headers: { Authorization: localStorage.getItem('authToken') }
        }).then(data => {
            dispatch({
                type: GET_PROFILE,
                payload: data.data
            })
        });
    }
};

export const createProfile = (data) => {
    return dispatch => {
        axios.post('/api/profile', data).then(data => {
            dispatch({
                type: CREATE_PROFILE,
                payload: data.data
            })
        });
    }
};

export const addExperience = (data) => {
    return dispatch => {
        axios.post('/api/profile/experience', data).then(data => {
            dispatch({
                type: ADD_EXPERIENCE,
                payload: data.data
            })
        });
    }
};

export const addEducation = (data) => {
    return dispatch => {
        axios.post('/api/profile/education', data).then(data => {
            dispatch({
                type: ALL_PROFILES,
                payload: data.data
            })
        });
    }
};

export const deleteEducation = (id) => {
    return dispatch => {
        axios.delete('/api/profile/education/' + id).then(data => {
            dispatch({
                type: DELETE_EDUCATION,
                payload: data.data
            })
        });
    }
};

export const deleteExperience = (id) => {
    return dispatch => {
        axios.delete('/api/profile/experience/' + id).then(data => {
            dispatch({
                type: DELETE_EXPERIENCE,
                payload: data.data
            })
        });
    }
};

export const getAllProfiles = () => {
    return dispatch => {
        axios.get('/api/profile/all').then(data => {
            dispatch({
                type: ALL_PROFILES,
                payload: data.data
            })
        });
    }
};