import React from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import { radioGroupCorrectAnswerChange } from '../../../../pages/myTests/actions';

const Choices = ({choices, question, setQuestion}) => (
    choices ?
        choices.map((choice, i) => {
            return (
                <FormControlLabel
                    control={<Radio
                        checked={choice.correctAnswer}
                        onChange={()=>radioGroupCorrectAnswerChange(i, question, setQuestion)}
                    />}
                    label={choice.text ? choice.text : choice.value ? choice.text ? choice.text : choice.value : 'Item' + (i + 1)}
                />
            )
        })
        : null
);

export default Choices;
