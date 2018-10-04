import {combineReducers} from 'redux';

import login from './loginReducer';
import register from './registerReducer';
import profile from './profileReducer';
import post from './postReducer';

export default combineReducers({
    login,
    register,
    profile,
    post
});

// reducer format
// export default (state = {}, action) => {
//     switch (action.type) {
//
//         default:
//             return {...state};
//     }
// }