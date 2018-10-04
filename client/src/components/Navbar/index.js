import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from "../../actions/loginAction";



class Navbar extends Component {



    initLogout = () => {
        this.props.logout();
        this.props.history.push('/');
    };

    render() {


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevConnector</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles"> Developers
                                </Link>
                            </li>
                        </ul>

                        {!this.props.currentUser ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul> : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/feed">
                                    Post Feed
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="dashboard.html">
                                    Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{cursor: 'pointer'}} onClick={this.initLogout}>
                                    <img className="rounded-circle"
                                         style={{width: '25px', marginRight: '5px'}}
                                         src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                                         alt=""
                                         title="You must have a Gravatar connected to your email to display an image"/> Logout
                                </a>
                            </li>
                        </ul>}
                    </div>
                </div>
            </nav>
        );
    }

}

const mapStateToProps = state => ({
    currentUser: state.login.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));