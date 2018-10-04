import {ADD_POST, ALL_POST} from "../actions/postAction";


export default (state = {}, action) => {
    switch (action.type) {
        case ALL_POST:
            return {
                ...state,
                allPosts: action.payload.posts
            };
        case ADD_POST:
            window.location.reload();
            return {
                ...state
            };
        default:
            return {...state};
    }
}