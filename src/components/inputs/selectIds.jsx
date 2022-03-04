import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const selectStyle = {
    width: '100%',
    marginTop: '18px'
}

const SelectComponent = ({ name, label, value, handleSelect, render, required, items }) => {

    const renderItems = () => items.map((i, k) => <MenuItem key={k} value={i._id}>
        {i.name}
    </MenuItem>)

    return render ? <FormControl
        required={required}
        variant="outlined"
        size="small"
        style={selectStyle}>
        <InputLabel id="label">{label}</InputLabel>
        <Select
            labelId="label"
            value={value}
            name={name}
            onChange={handleSelect}
            label={label}>
            <MenuItem value="">
                <em>{label}</em>
            </MenuItem>
            {items && items.length > 0 && renderItems()}
        </Select>
    </FormControl> : null
}


export default React.memo(SelectComponent);