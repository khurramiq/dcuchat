import React from 'react';
import TextField from '@material-ui/core/TextField';
const inputStyle = {
    fontSize: '1em',
    marginBottom:'10px'
};

export default React.memo(({label, name, required, value, type, handleInput, rowsMax, rows, variant}) => <TextField
    style={inputStyle}
    fullWidth
    multiline
    rowsMax={rowsMax}
    rows={rows}
    required={required}
    label={label}
    name={name}
    type={type}
    size="small"
    value={value}
    onChange={handleInput}
    variant={variant} />)