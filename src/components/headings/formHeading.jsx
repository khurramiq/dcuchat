import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default ({ heading, subheading }) => <Grid item>
    <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item>
            <Typography component="h1">
                <Box
                    fontSize="1.8em"
                    fontWeight={600}
                    letterSpacing={1}
                    textAlign="center"
                    fontFamily="Roboto">
                    {heading}
                </Box>
            </Typography>
        </Grid>
        <Grid item>
            <Typography component="h1">
                <Box
                    fontSize="1.2em"
                    mb={2}
                    fontWeight={500}
                    textAlign="center"
                    fontFamily="Arial">
                    {subheading}
                </Box>
            </Typography>
        </Grid>
    </Grid>
</Grid>