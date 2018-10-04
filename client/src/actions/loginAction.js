import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";

export const LOGIN = "LOGIN";
export const SET_ERRORS_LOGIN_NULL = "SET_ERRORS_LOGIN_NULL";
export const LOGOUT = "LOGOUT";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const initLogin = (data) => {
    return dispatch => {
        axios.post('/api/users/login', data).then(tokenData => {
            console.log(tokenData);
            dispatch({
                type: LOGIN,
                payload: tokenData.data
            });
        });
    }
};

export const setCurrentUser = (token) => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: localStorage.getItem('authToken')
        });
    }
};

export const setLoginErrorsToNull = () => {
    return dispatch => {
        dispatch({
            type: SET_ERRORS_LOGIN_NULL
        })
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('authToken');
        setAuthToken(false);
        dispatch({
            type: LOGOUT,
            payload: {currentUser: null}
        });
    }
};