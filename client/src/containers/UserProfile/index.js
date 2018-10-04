import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withRouter, Link} from 'react-router-dom';
import ProfileTab from "../../components/ProfileTab";


class UserProfile extends Component {


    componentDidUpdate() {

    }

    componentDidMount() {

    }


    // render() {
    //     return (
    //
    //         );
    // }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));