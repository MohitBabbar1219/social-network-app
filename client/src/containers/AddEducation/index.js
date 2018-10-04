import React, {Component} from 'react';

import {connect} from 'react-redux';
import validateEducationInputs from "../../helpers/educationValidations";
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import {addEducation} from "../../actions/profileAction";



class AddExperience extends Component {


    state = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    };


    componentDidUpdate() {
        console.log(this.state);
        if (this.props.educationAdded) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidMount() {

    }

    onEducationFormSubmit = (evt) => {
        evt.preventDefault();

        const newProfile = {...this.state};

        const {errors, isValid} = validateEducationInputs(newProfile);


        if (!isValid) {
            this.setState({errors: {...errors}});
            console.log(errors);
            return;
        }
        this.setState({educationAdded: true});
        this.props.addEducation(newProfile);

    };

    onInputChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    render() {
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onEducationFormSubmit}>
                                <div className="form-group">
                                    <input value={this.state.school} onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                           placeholder="* School Or Bootcamp" name="school" />
                                    {this.state.errors.school ? <p className='text-danger ml-2'>{this.state.errors.school}</p> : <p></p>}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.degree} onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                           placeholder="* Degree Or Certificate" name="degree" />
                                    {this.state.errors.degree ? <p className='text-danger ml-2'>{this.state.errors.degree}</p> : <p></p>}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.fieldofstudy} onChange={this.onInputChange} type="text" className="form-control form-control-lg"
                                           placeholder="Field Of Study" name="fieldofstudy"/>
                                    {this.state.errors.fieldofstudy ? <p className='text-danger ml-2'>{this.state.errors.fieldofstudy}</p> : <p></p>}
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
                                    <input value={this.state.current} onChange={this.onInputChange} className="form-check-input" type="checkbox" name="current" value=""
                                           id="current"/>
                                    <label className="form-check-label" htmlFor="current">
                                        Current Job
                                    </label>
                                </div>
                                <div className="form-group">
                                    <textarea value={this.state.description} onChange={this.onInputChange} className="form-control form-control-lg" placeholder="Program Description"
                                              name="description"></textarea>
                                    <small className="form-text text-muted">Tell us about your experience and what you
                                        learned
                                    </small>
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
    educationAdded: state.profile.educationAdded


});

const mapDispatchToProps = dispatch => bindActionCreators({
    addEducation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));