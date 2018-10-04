import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import validateRegister from './../../helpers/registerValidations';

import {initRegister} from './../../actions/registerAction';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: [],
    };

    onInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    };

    componentDidUpdate() {
        if (this.props.registerData) {
            console.log(this.props.registerData);
            this.props.history.push('/login');
        }
        if (localStorage.getItem('authToken')) {
            this.props.history.push('/dashboard');
        }
    }

    onRegisterFormSubmit = (evt) => {
        evt.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        const {errors, isValid} = validateRegister(newUser);

        if (!isValid) {
            this.setState({errors: {...errors}});
            return;
        }

        this.props.initRegister(newUser);

        console.log(newUser);
    };

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onRegisterFormSubmit}>
                                <div className="form-group">
                                    <input type="text" value={this.state.name} onChange={this.onInputChange} className="form-control form-control-lg" placeholder="Name"
                                           name="name"/>
                                    {!!this.state.errors.name ? <p className="text-danger ml-2">{this.state.errors.name}</p> : null}
                                </div>
                                <div className="form-group">
                                    <input type="email" value={this.state.email} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="Email Address" name="email"/>
                                    {!!this.state.errors.email ? <p className="text-danger ml-2">{this.state.errors.email}</p> : null}
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="Password" name="password"/>
                                    {!!this.state.errors.password ? <p className="text-danger ml-2">{this.state.errors.password}</p> : null}
                                </div>
                                <div className="form-group">
                                    <input type="password"  value={this.state.password2} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="Confirm Password" name="password2"/>
                                    {!!this.state.errors.password2 ? <p className="text-danger ml-2">{this.state.errors.password2}</p> : null}
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

const mapStateToProps = state => ({
    registerData: state.register.isRegistrationSuccessful
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initRegister
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));