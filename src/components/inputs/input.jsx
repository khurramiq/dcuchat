import React from 'react';
import TextField from '@material-ui/core/TextField';
const inputStyle = {
    fontSize: '1em',
    marginTop:'18px'
};

export default React.memo(({label, name, required, value, type, handleInput}) => <TextField
    style={inputStyle}
    fullWidth
    required={required}
    label={label}
    name={name}
    type={type}
    size="small"
    value={value}
    onChange={e => handleInput(e)}
    variant="outlined" />)