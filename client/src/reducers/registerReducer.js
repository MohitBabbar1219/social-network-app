import {REGISTER} from './../actions/registerAction';


export default (state = {}, action) => {
    switch (action.type) {
        case REGISTER:
            if (action.payload.message === 'successful') {
                return {
                    ...state,
                    isRegistrationSuccessful: true
                }
            }
            return {
                ...state
            };
        default:
            return {...state};
    }
}