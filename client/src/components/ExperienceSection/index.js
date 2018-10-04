import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ExperienceTab from './../ExperienceTab';
import {deleteExperience} from "../../actions/profileAction";

const ExperienceSection = (props) => (
    <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
            <thead>
            <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th/>
            </tr>
            </thead>
            <tbody>
                {props.experience ? props.experience.map(exp => <ExperienceTab exp={exp}  onDeleteButtonClick={() => props.deleteExperience(exp._id)} key={exp._id} />) : null}
            </tbody>
        </table>
    </div>
);
const mapStateToProps = state => ({
    education: state.profile.profile.education
});

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteExperience
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceSection);