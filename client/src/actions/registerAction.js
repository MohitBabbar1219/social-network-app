import axios from 'axios';

export const REGISTER = "REGISTER";

export const initRegister = (data) => {
    return dispatch => {
        axios.post('/api/users/register', data).then(data => {
            dispatch({
                type: REGISTER,
                payload: data.data
            })
        });
    }
};