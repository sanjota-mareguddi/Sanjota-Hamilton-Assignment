

import React from 'react';

const SortBy = (props) => {
    return (<select onChange={props.change}>
        <option value="" disabled=""> Sort by </option>
        <option value="asc"> A - Z </option>
        <option value="desc"> Z - A </option>
    </select>)
}
export default SortBy;