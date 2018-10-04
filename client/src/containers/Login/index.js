import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import validateLogin from './../../helpers/loginValidations';

import {initLogin, setLoginErrorsToNull} from './../../actions/loginAction';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    };

    onInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    };

    componentDidMount() {
        if (this.props.isLoginSuccessful === true) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidUpdate() {
        if (this.props.errors) {
            this.setState({errors: this.props.errors});
            console.log(this.props.errors);
            this.props.setLoginErrorsToNull();
        } else if (this.props.isLoginSuccessful === true) {
            this.props.history.push('/dashboard');
        }
    }

    onLoginFormSubmit = (evt) => {
        evt.preventDefault();

        const newLogin = {
            email: this.state.email,
            password: this.state.password
        };

        const {errors, isValid} = validateLogin(newLogin);

        if (!isValid) {
            this.setState({errors: {...errors}});
            return;
        }

        this.props.initLogin(newLogin);

        console.log(newLogin);
    };

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onLoginFormSubmit}>
                                <div className="form-group">
                                    <input type="text" value={this.state.email} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="Email Address" name="email"/>
                                    {!!this.state.errors.email ? <p className="text-danger ml-2">{this.state.errors.email}</p> : null}
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange={this.onInputChange} className="form-control form-control-lg"
                                           placeholder="Password" name="password"/>
                                    {!!this.state.errors.password ? <p className="text-danger ml-2">{this.state.errors.password}</p> : null}
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
    isLoginSuccessful: state.login.isLoginSuccessful,
    currentUser: state.login.currentUser,
    errors: state.login.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initLogin,
    setLoginErrorsToNull
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));