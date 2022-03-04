import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { updateRecentSurvey } from '../../../../redux/actions/surveyActions';
import { updateRecentQuestion } from '../../../../redux/actions/questionActions';
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const QDropdown = (props) => {
    const {label, doption, list, recent, flag, surveyId, initialState, setQuestion} = props;
    const dispatch = useDispatch();

    const classes = useStyles();
    const handleChange = (id) => {
        if (flag === 'q') {            
            dispatch(updateRecentQuestion({surveyId: surveyId, questionId:id}));
            setQuestion({ ...initialState, survey: recent });
        } else {            
            dispatch(updateRecentSurvey({ surveyId: id }));            
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>            
            <FormControl className={classes.formControl}>
                <span style={{ textAlign: 'left' }}>{label}</span>
                <NativeSelect
                    value={recent}
                    onChange={(e)=>handleChange(e.target.value)}
                    name="dropdownlist"
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'dropdownlist' }}
                >
                    <option value=""> --- {doption} --- </option>
                    {
                        list && list.length > 0 ?
                            list.map((item, i) => (
                                item._id===recent?
                                <option key={i} value={item._id}>{flag==='q'?item.name:item.title}</option>
                                    :
                                <option key={i} value={item._id}>{flag==='q'?item.name:item.title}</option>
                            ))
                            : null
                    }

                </NativeSelect>
            </FormControl>

        </div>
    )
}

export default QDropdown;
