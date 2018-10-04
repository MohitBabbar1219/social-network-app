import {
    GET_PROFILE,
    CREATE_PROFILE,
    ADD_EXPERIENCE,
    ADD_EDUCATION,
    DELETE_EDUCATION,
    DELETE_EXPERIENCE, ALL_PROFILES
} from './../actions/profileAction';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
            if (action.payload.profile) {
                return {
                    ...state,
                    profile: action.payload.profile
                };
            }
            return {
                ...state,
                errors: {noProfile: 'no profile found'}
            };
        case ADD_EXPERIENCE:
            if (action.payload.profile) {
                return {
                    ...state,
                    profile: action.payload.profile,
                    experienceAdded: true
                };
            }
            return {
                ...state,
                errors: {noProfile: 'no profile found'}
            };
        case ADD_EDUCATION:
            if (action.payload.profile) {
                return {
                    ...state,
                    profile: action.payload.profile,
                    educationAdded: true
                };
            }
            return {
                ...state,
                errors: {noProfile: 'no profile found'}
            };
        case DELETE_EDUCATION:
            if (action.payload.profile) {
                return {
                    ...state,
                    profile: action.payload.profile
                };
            }
            return {
                ...state
            };
        case DELETE_EXPERIENCE:
            if (action.payload.profile) {
                return {
                    ...state,
                    profile: action.payload.profile
                };
            }
            return {
                ...state
            };
        case ALL_PROFILES:
            if (action.payload.profiles) {
                return {
                    ...state,
                    allProfiles: action.payload.profiles
                };
            }
            return {
                ...state
            };
        case CREATE_PROFILE:
            if (action.payload.profile) {
                return {
                    ...state,
                    createdProfile: action.payload.profile
                };
            } else {
                return {
                    ...state,
                    createProfileErrors: {...action.payload.errors}
                };
            }
        default:
            return {...state};
    }
}