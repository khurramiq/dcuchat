import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Eye from '@material-ui/icons/Visibility';
import EyeSlash from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
const inputStyle = {
    fontSize: '1em'
};

export default React.memo(({ label, name, value, handleInput }) => {
    const [showPassword, toggleEye] = useState('');

    return <TextField
        style={inputStyle}
        fullWidth
        required
        label={label}
        name={name}
        size="small"
        value={value}
        onChange={e => handleInput(e)}
        type={!showPassword ? 'password' : 'text'}
        variant="outlined"
        InputProps={{
            endAdornment: (
                <InputAdornment position={'end'}>
                    <IconButton onClick={e => toggleEye(!showPassword)}>
                        {!showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                </InputAdornment>)
        }}
    />})