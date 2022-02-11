

import React from 'react';
import './style.scss';

const SortBy = (props) => {
    return (<select onChange={props.change}>
        <option value="asc"> A - Z </option>
        <option value="desc"> Z - A </option>
    </select>)
}
export default SortBy;