import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TitleIcon from '@material-ui/icons/Title';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
// import CommentIcon from '@material-ui/icons/Comment';
// import StarsIcon from '@material-ui/icons/Stars';
// import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
// import ViewModuleIcon from '@material-ui/icons/ViewModule';
// import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import useStyles from './styles';

const ToolBox = (props) => {
    const { open, handleToolDrawerChange, setQuestion, question } = props;
    const tollBoxItems = [
        { text: 'Single Input', icon: TitleIcon },
        // { text: 'Checkbox', icon: CheckBoxIcon },
        // { text: 'Radiogroup', icon: RadioButtonCheckedIcon },
        // { text: 'Dropdown', icon: ArrowDropDownCircleIcon },
        // { text: 'Comment', icon: CommentIcon },
        // { text: 'Rating', icon: StarsIcon },        
        // { text: 'Boolean', icon: LibraryAddCheckIcon },
        // { text: 'Matrix (Single choice)', icon: ViewModuleIcon },
        // { text: 'Multiple Text', icon: FormatListBulletedIcon }
    ];
    const classes = useStyles();
    const theme = useTheme();
    const handleTypeChange = (type) => {
        setQuestion({ ...question, type: type });
    }

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <ListItemText primary={'Tool Box'} />
                    <IconButton onClick={handleToolDrawerChange}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {tollBoxItems.map((item, i) => (
                        <ListItem onClick={() => handleTypeChange(item.text)} button key={i}>
                            <ListItemIcon><item.icon /></ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </div>
    );
}

export default ToolBox;