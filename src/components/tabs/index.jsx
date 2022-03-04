import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const paperStyle = {
    marginTop: '20px'
};

const Bar = ({ handleChange, value }) => {

    return <Paper square style={paperStyle}>
        <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleChange}>

            <Tab label="State" />
            <Tab label="County" />
            <Tab label="City" />
            <Tab label="Town" />
            <Tab label="Other Customers" />

        </Tabs>
    </Paper>
}

export default React.memo(Bar);