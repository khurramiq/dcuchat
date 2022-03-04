import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avtr from '../../assets/user.png';
const ImageStyle = {
    width: '150px',
    height: '150px'
};

const InputStyle = {
    marginBottom: '16px'
};

const Image = ({ value, handleImage }) => {
    return <Grid container direction="column" alignItems="center" spacing={2} >
        <Grid item xs={12}>
            <img src={value ? value : Avtr}
                alt="Profile"
                style={ImageStyle} />
        </Grid>
        <Grid item xs={12}>
            <input type='file'
                style={InputStyle}
                onChange={e => handleImage(e)}
                accept="image/x-png,image/png,image/gif,image/jpeg,image/jpg" />
        </Grid>
    </Grid>
};

export default React.memo(Image);