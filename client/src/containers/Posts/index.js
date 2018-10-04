import React, {Component} from 'react';

import {connect} from 'react-redux';
import postValidation from "../../helpers/postValidation";
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import Post from "../../components/Post";
import {getAllPosts, addPost} from "../../actions/postAction";



class AddExperience extends Component {


    state = {
        text: '',
        errors: {}
    };


    componentDidUpdate() {
        console.log(this.state);
        if (this.props.allPosts) {
            console.log(this.props.allPosts);
        }
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    onPostFormSubmit = (evt) => {
        evt.preventDefault();

        const newProfile = {...this.state};

        const {errors, isValid} = postValidation(newProfile);


        if (!isValid) {
            this.setState({errors: {...errors}});
            console.log(errors);
            return;
        }
        // this.setState({experienceAdded: true});
        this.props.addPost(newProfile);

    };

    onInputChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    render() {
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="post-form mb-3">
                                <div className="card card-info">
                                    <div className="card-header bg-info text-white">
                                        Say Somthing...
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.onPostFormSubmit}>
                                            <div className="form-group">
                                                <textarea value={this.state.text} onChange={this.onInputChange} className="form-control form-control-lg"
                                                          name="text" placeholder="Create a post"></textarea>
                                                {this.state.errors.text ? <p className='text-danger ml-2'>{this.state.errors.text}</p> : <p></p>}
                                            </div>
                                            <button type="submit" className="btn btn-dark">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="posts">
                                {this.props.allPosts ? this.props.allPosts.map(post => <Post data={post}/>) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    allPosts: state.post.allPosts

});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPosts,
    addPost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));
