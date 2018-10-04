import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import EducationTab from './../EducationTab';
import {deleteEducation} from "../../actions/profileAction";

const EducationSection = (props) => (
    <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
            <thead>
            <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th/>
            </tr>
            </thead>
            <tbody>
                {props.education ? props.education.map(educ => <EducationTab onDeleteButtonClick={() => props.deleteEducation(educ._id)} edu={educ} key={educ._id} />) : null}
            </tbody>
        </table>
    </div>
);

const mapStateToProps = state => ({
    education: state.profile.profile.education
});

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteEducation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EducationSection);