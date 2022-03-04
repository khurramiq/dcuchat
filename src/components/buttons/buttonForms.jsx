import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const buttonStyle = {
    fontWeight: '500',
    fontSize: '1em'
};

export default ({ text }) => <Grid item xs={12}>
    <Button color="primary" fullWidth type="submit" variant="contained" style={buttonStyle}>
        {text}
    </Button>
</Grid>