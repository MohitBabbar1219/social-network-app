import React from 'react';

const EducationTab = (props) => (
    <tr>
        <td>{props.edu.school}</td>
        <td>{props.edu.degree}</td>
        <td>
            {new Date(props.edu.from).getDate() + '/' + (new Date(props.edu.from).getMonth() + 1) + '/' + new Date(props.edu.from).getFullYear()} - {new Date(props.edu.to).getDate() + '/' + (new Date(props.edu.to).getMonth() + 1) + '/' + new Date(props.edu.to).getFullYear()}
        </td>
        <td>
            <button onClick={props.onDeleteButtonClick} className="btn btn-danger">
                Delete
            </button>
        </td>
    </tr>
);

export default EducationTab;
