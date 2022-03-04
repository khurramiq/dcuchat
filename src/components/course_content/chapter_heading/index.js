import React from 'react';
import { Grid } from '@material-ui/core';
import './style.css';

const ChapterHeading = ({chapterNo, chapterTitle}) => {
    return (
        <div className="chapter-heading-wrapper">
            <Grid container xs={12}>
                <Grid item xs={3} sm={2}>{ chapterNo }</Grid>
                <Grid item xs={9} sm={10}>{ chapterTitle }</Grid>
            </Grid>
        </div>
    )
}

export default ChapterHeading;
