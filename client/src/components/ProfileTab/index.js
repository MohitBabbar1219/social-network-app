import React from "react";

import { Link } from 'react-router-dom';

const ProfileTab = (props) => (
    <div className="card card-body bg-light mb-3">
        <div className="row">
            <div className="col-2">
                <img className="rounded-circle"
                     src={props.profile.user.avatar}
                     alt=""/>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
                <h3>{props.profile.user.name}</h3>
                <p>{props.profile.status + ' at ' + props.profile.company}</p>
                <p>{props.profile.location}</p>
                <Link to={"/profile/" + props.profile.handle} className="btn btn-info">View Profile</Link>
            </div>
            <div className="col-md-4 d-none d-lg-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                    {props.profile.skills.map(skill => <li key={skill} className="list-group-item">
                        <i className="fa fa-check pr-1"></i>{skill}
                    </li>)}
                </ul>
            </div>
        </div>
    </div>
);

export default ProfileTab;


