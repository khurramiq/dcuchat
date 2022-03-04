import React from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import ListButton from '@material-ui/icons/MoreHoriz';

const color = {
    color: '#fff',
};

const menuStyle = {
    marginTop: '30px',
};

const colorB = {
    color: '#000',
};

export default ({ anchorEl, handleClose, handleClick, items, i, text }) => {

    const renderList = () => items.map(it => (it.props.render || i === 1) && it);

    return <div>
        <IconButton
            aria-controls="simple-menu"
            style={i === 1 ? colorB : color}
            aria-haspopup="true"
            onClick={handleClick}>
            {
                i === 1 ? <ListButton /> : <> {text} <ExpandMore /> </>
            }
        </IconButton>
        <Menu
            style={menuStyle}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {renderList()}
        </Menu>
    </div>
}