import React, {Component} from 'react';
import ExperienceSection from "../../components/ExperienceSection";
import EducationSection from "../../components/EducationSection";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withRouter, Link} from 'react-router-dom';

import {getProfile} from './../../actions/profileAction';

class Dashboard extends Component {


    componentDidUpdate() {
        if (this.props.profile) {
            console.log(this.props.profile);
        }
        if (this.props.errors) {
            console.log(this.props.errors);
        }
    }

    componentDidMount() {
        this.props.getProfile();
    }


    render() {
        return (
            <div className="dashboard">
                <div className="container">
                    {this.props.profile ? <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            <p className="lead text-muted">Welcome {this.props.profile.user.name}</p>
                            <div className="btn-group mb-4" role="group">
                                <Link to="/edit_profile" className="btn btn-light">
                                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                                <Link to="/add_experience" className="btn btn-light">
                                    <i className="fab fa-black-tie text-info mr-1"></i>
                                    Add Experience</Link>
                                <Link to="/add_education" className="btn btn-light">
                                    <i className="fas fa-graduation-cap text-info mr-1"></i>
                                    Add Education</Link>
                            </div>


                            <ExperienceSection experience={this.props.profile.experience}/>

                            <EducationSection />

                            <div style={{marginBottom: '60px'}}>
                                <button className="btn btn-danger">
                                    Delete My Account
                                </button>
                            </div>
                        </div>
                    </div> : null}
                    {this.props.errors ? <div>
                        <h2>You have not created your profile yet...</h2>
                        <button onClick={() => this.props.history.push('/create_profile')} className="btn btn-dark">
                            Create Profile
                        </button>
                    </div> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    errors: state.profile.errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));