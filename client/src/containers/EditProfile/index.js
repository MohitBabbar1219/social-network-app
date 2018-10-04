import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import validateProfileInputs from "../../helpers/profileValidations";
import {createProfile} from "../../actions/profileAction";
import {Link, withRouter} from 'react-router-dom';


class EditProfile extends Component {


    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {},
        editted: false
    };


    componentDidUpdate() {

        console.log(this.state);

        if (this.state.editted) {
            console.log(this.props.profile);
            this.props.history.push('/dashboard');
        }
        if (this.props.errors) {
            console.log(this.props.errors);
        }
    }

    componentDidMount() {
        if (this.props.gottenProfile) {
            this.setState({...this.props.gottenProfile, skills: this.props.gottenProfile.skills.join(',')});
            console.log({...this.props.gottenProfile});
        }
    }

    onProfileFormSubmit = (evt) => {
        evt.preventDefault();

        const newProfile = {...this.state};

        const {errors, isValid} = validateProfileInputs(newProfile);

        if (!isValid) {
            this.setState({errors: {...errors}});
            console.log(errors);
            return;
        }
        this.setState({editted: true});
        this.props.createProfile(newProfile);

    };

    onInputChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log(this.state);
    };

    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand
                                out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onProfileFormSubmit} action="add-experience.html">
                                <div className="form-group">
                                    <input disabled type="text" value={this.state.handle} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="* Profile handle" name="handle"/>
                                    {this.state.errors.handle ? <p className='text-danger ml-2'>{this.state.errors.handle}</p> : <p></p>}
                                    <small className="form-text text-muted">A unique handle for your profile URL. Your
                                        full name, company name, nickname, etc (This CAN'T be changed later)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <select value={this.state.status} onChange={this.onInputChange} className="form-control form-control-lg" name="status">
                                        <option value="0">* Select Professional Status</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Junior Developer">Junior Developer</option>
                                        <option value="Senior Developer">Senior Developer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Student or Learning">Student or Learning</option>
                                        <option value="Instructor">Instructor or Teacher</option>
                                        <option value="Intern">Intern</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {this.state.errors.status ? <p className='text-danger ml-2'>{this.state.errors.status}</p> : <p></p>}
                                    <small className="form-text text-muted">Give us an idea of where you are at in your
                                        career
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input value={this.state.company} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="Company"
                                           name="company"/>
                                    <small className="form-text text-muted">Could be your own company or one you work
                                        for
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input value={this.state.website} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="Website"
                                           name="website"/>
                                    {this.state.errors.website ? <p className='text-danger ml-2'>{this.state.errors.website}</p> : <p></p>}
                                    <small className="form-text text-muted">Could be your own or a company website
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input value={this.state.location} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="Location"
                                           name="location"/>
                                    <small className="form-text text-muted">City & state suggested (eg. Boston, MA)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input value={this.state.skills} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="Skills"
                                           name="skills"/>
                                    {this.state.errors.skills ? <p className='text-danger ml-2'>{this.state.errors.skills}</p> : <p></p>}
                                    <small className="form-text text-muted">Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP)
                                    </small>
                                </div>
                                {/*<div className="form-group">*/}
                                    {/*<input onChange={this.onInputChange} type="text" className="form-control form-control-lg"*/}
                                           {/*placeholder="Github Username" name="githubusername"/>*/}
                                    {/*<small className="form-text text-muted">If you want your latest repos and a Github*/}
                                        {/*link, include your username*/}
                                    {/*</small>*/}
                                {/*</div>*/}
                                <div className="form-group">
                                    <textarea  value={this.state.bio} onChange={this.onInputChange} className="form-control form-control-lg"
                                              placeholder="A short bio of yourself" name="bio"></textarea>
                                    <small className="form-text text-muted">Tell us a little about yourself</small>
                                </div>

                                <div className="mb-3">
                                    <button type="button" onClick={() => this.setState({displaySocialInputs: !this.state.displaySocialInputs})} className="btn btn-light">Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {this.state.displaySocialInputs ? <div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fab fa-twitter"></i>
                                        </span>
                                        </div>
                                        <input onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                               placeholder="Twitter Profile URL" name="twitter"/>
                                        {this.state.errors.twitter ? <p className='text-danger ml-2'>{this.state.errors.twitter}</p> : <p></p>}

                                    </div>

                                    <div onChange={this.onInputChange} className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fab fa-facebook"></i>
                                        </span>
                                        </div>
                                        <input onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                               placeholder="Facebook Page URL" name="facebook"/>
                                        {this.state.errors.facebook ? <p className='text-danger ml-2'>{this.state.errors.facebook}</p> : <p></p>}

                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fab fa-linkedin"></i>
                                        </span>
                                        </div>
                                        <input onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                               placeholder="Linkedin Profile URL" name="linkedin"/>
                                        {this.state.errors.linkedin ? <p className='text-danger ml-2'>{this.state.errors.linkedin}</p> : <p></p>}

                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fab fa-youtube"></i>
                                        </span>
                                        </div>
                                        <input onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                               placeholder="YouTube Channel URL" name="youtube"/>
                                        {this.state.errors.youtube ? <p className='text-danger ml-2'>{this.state.errors.youtube}</p> : <p></p>}
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fab fa-instagram"></i>
                                        </span>
                                        </div>
                                        <input onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                               placeholder="Instagram Page URL" name="instagram"/>
                                        {this.state.errors.instagram ? <p className='text-danger ml-2'>{this.state.errors.instagram}</p> : <p></p>}

                                    </div>

                                </div> : null}
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.profile.createProfileErrors,
    profile: state.profile.createdProfile,
    gottenProfile: state.profile.profile

});

const mapDispatchToProps = dispatch => bindActionCreators({
    createProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));