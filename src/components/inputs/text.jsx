import React from 'react';
import TextField from '@material-ui/core/TextField';
const inputStyle = {
    fontSize: '1em',
    marginBottom:'10px'
};

export default React.memo(({label, name, required, value, type, handleInput, variant}) => <TextField
    style={inputStyle}
    fullWidth
    required={required}
    label={label}
    name={name}
    type={type}
    size="small"
    value={value}
    onChange={handleInput}
    autoComplete="off"
    variant={variant}    
/>)