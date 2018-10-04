import React from 'react';

const Post = (props) => (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block"
                         src={props.data.user.avatar}
                         alt=""/>
                </a>
                <br/>
                <p className="text-center">{props.data.user.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{props.data.text}</p>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-up"></i>
                    <span className="badge badge-light">{props.data.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <a href="post.html" className="btn btn-info mr-1">
                    Comments
                </a>
            </div>
        </div>
    </div>
);

export default Post;
