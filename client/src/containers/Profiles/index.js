import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withRouter, Link} from 'react-router-dom';
import ProfileTab from "../../components/ProfileTab";
import {getAllProfiles} from "../../actions/profileAction";


class Profiles extends Component {


    componentDidUpdate() {
        if (this.props.allProfiles) {
            console.log(this.props.allProfiles)
        }
    }

    componentDidMount() {
        this.props.getAllProfiles();
    }


    render() {
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>

                            {this.props.allProfiles ? this.props.allProfiles.map(profile => <ProfileTab profile={profile}/>) : null}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allProfiles: state.profile.allProfiles
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllProfiles
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profiles));