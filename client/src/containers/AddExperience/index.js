import React, {Component} from 'react';

import {connect} from 'react-redux';
import validateExperienceInputs from "../../helpers/experienceValidations";
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import {addExperience} from "../../actions/profileAction";



class AddExperience extends Component {


    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false,
        experienceAdded: false
    };


    componentDidUpdate() {
        console.log(this.state);
        if (this.props.experienceAdded) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidMount() {

    }

    onExperienceFormSubmit = (evt) => {
        evt.preventDefault();

        const newProfile = {...this.state};

        const {errors, isValid} = validateExperienceInputs(newProfile);


        if (!isValid) {
            this.setState({errors: {...errors}});
            console.log(errors);
            return;
        }
        this.setState({experienceAdded: true});
        this.props.addExperience(newProfile);

    };

    onInputChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    render() {
        return (
            <div className="section add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Your Experience</h1>
                            <p className="lead text-center">Add any developer/programming positions that you have had in
                                the past</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onExperienceFormSubmit}>
                                <div className="form-group">
                                    <input value={this.state.title} onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                           placeholder="* Job Title" name="title" />
                                    {this.state.errors.title ? <p className='text-danger ml-2'>{this.state.errors.title}</p> : <p></p>}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.company} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="* Company"
                                           name="company" />
                                    {this.state.errors.company ? <p className='text-danger ml-2'>{this.state.errors.company}</p> : <p></p>}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.location} onChange={this.onInputChange} type="text" className="form-control form-control-lg" placeholder="Location"
                                           name="location"/>
                                </div>
                                <h6>From Date</h6>
                                <div className="form-group">
                                    <input value={this.state.from} onChange={this.onInputChange} type="date" className="form-control form-control-lg" name="from"/>
                                    {this.state.errors.from ? <p className='text-danger ml-2'>{this.state.errors.from}</p> : <p></p>}
                                </div>
                                <h6>To Date</h6>
                                <div className="form-group">
                                    <input value={this.state.to} onChange={this.onInputChange} type="date" className="form-control form-control-lg" name="to"/>
                                </div>
                                <div className="form-check mb-4">
                                    <input value={this.state.current} onChange={this.onInputChange} className="form-check-input" type="checkbox" name="current"
                                           id="current"/>
                                    <label className="form-check-label" htmlFor="current">
                                        Current Job
                                    </label>
                                </div>
                                <div className="form-group">
                                    <textarea value={this.state.description} onChange={this.onInputChange} className="form-control form-control-lg" placeholder="Job Description"
                                              name="description"></textarea>
                                    <small className="form-text text-muted">Some of your responsabilities, etc</small>
                                </div>
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
    experienceAdded: state.profile.experienceAdded

});

const mapDispatchToProps = dispatch => bindActionCreators({
    addExperience
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));