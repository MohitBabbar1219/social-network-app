import axios from "axios";


export const ADD_POST = "ADD_POST";
export const ALL_POST = "ALL_POST";


export const addPost = (data) => {
    return dispatch => {
        axios.post('/api/posts', data).then(data => {
            dispatch({
                type: ADD_POST,
                payload: data.data
            })
        });
    }
};

export const getAllPosts = () => {
    return dispatch => {
        axios.get('/api/posts').then(data => {
            dispatch({
                type: ALL_POST,
                payload: data.data
            })
        });
    }
};