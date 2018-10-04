import {LOGIN, LOGOUT, SET_CURRENT_USER, SET_ERRORS_LOGIN_NULL} from './../actions/loginAction';
import jwtDecoder from 'jwt-decode';

import setAuthToken from './../utils/setAuthToken';


export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            console.log(action.payload);
            if (action.payload.success === true) {
                const decodedToken = jwtDecoder(action.payload.token);
                console.log(decodedToken);
                localStorage.setItem("authToken", action.payload.token);
                setAuthToken(action.payload.token);
                return {
                    ...state,
                    isLoginSuccessful: true,
                    currentUser: decodedToken
                }
            }
            return {
                ...state,
                isLoginSuccessful: false,
                errors: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                currentUser: null,
                isLoginSuccessful: false
            };
        case SET_CURRENT_USER:
            if (localStorage.getItem('authToken')) {
                const decodedToken = jwtDecoder(localStorage.getItem('authToken'));
                if (decodedToken.name.toString().length > 2) {
                    return {
                        ...state,
                        isLoginSuccessful: true,
                        currentUser: decodedToken
                    }
                } else {
                    return {
                        ...state,
                        isLoginSuccessful: false,
                        errors: action.payload
                    };
                }
            } else {
                return {
                    ...state,
                    isLoginSuccessful: false,
                    errors: action.payload
                };
            }
        case SET_ERRORS_LOGIN_NULL:
            return {...state, errors: null};
        default:
            return {...state};
    }
}