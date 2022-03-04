import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { checkBoxCorrectAnswerChange } from '../../../../pages/myTests/actions';

const Choices = ({choices, question, setQuestion}) => (

    choices ?
    choices.map((choice, i) => {
            return (
                <FormControlLabel
                    key={i}
                    control={<Checkbox checked={choice.correctAnswer} onChange={()=>checkBoxCorrectAnswerChange(i, !choice.correctAnswer, question, setQuestion)}/>}
                    label={choice.text ? choice.text : choice.value ? choice.text ? choice.text : choice.value : 'item' + (i + 1)}
                />
            )
        })
        : null
        
)

export default Choices;
