import React from 'react';

const ExperienceTab = (props) => (
    <tr>
        <td>{props.exp.company}</td>
        <td>{props.exp.title}</td>
        <td>
            {new Date(props.exp.from).getDate() + '/' + (new Date(props.exp.from).getMonth() + 1) + '/' + new Date(props.exp.from).getFullYear()} - {new Date(props.exp.to).getDate() + '/' + (new Date(props.exp.to).getMonth() + 1) + '/' + new Date(props.exp.to).getFullYear()}
        </td>
        <td>
            <button onClick={props.onDeleteButtonClick} className="btn btn-danger">
                Delete
            </button>
        </td>
    </tr>
);

export default ExperienceTab;
