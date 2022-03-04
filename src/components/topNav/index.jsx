import React, { useEffect, useState } from "react";
import Logo from "../../assets/dculogo-removebg-preview.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListLink from "./list";
import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Messages from "./components/messages";
import { baseUrl } from "../../utils/api";
import axios from "axios";
import { messageConstants } from "../../redux/constants";
const { CLEAR_MESSAGE_NOTIFICATION, MESSAGE_NOTIFICATION } = messageConstants;

const LogoStyle = {
  width: "70px",
  height: "70px",
  padding: "6px 6px 8px 6px",
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopNav = ({ onlineUsers, arrivalMessage, socket }) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _message = useSelector((state) => state.message);
  // const [conversations, setConversations] = useState([]);
  const [totalMessageNotification, setTotalMessageNotification] = useState(0);
  const responsive = useMediaQuery("(max-width: 992px)");
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openMessages, setOpenMessages] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.current.on("getNotification", (notification) => {
      setNotifications([...notifications, notification]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_message.cMessageNotification) {
      setTotalMessageNotification(
        totalMessageNotification - _message.cMessageNotification
      );
      dispatch({
        type: MESSAGE_NOTIFICATION,
        payload: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_message.cMessageNotification]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/conversations/` + _User?.profile?._id
        );
        // setConversations(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (_User?.profile?._id) {
            if (
              res.data[i].notifications.senderNotifications.userId ===
              _User?.profile?._id
            ) {
              setTotalMessageNotification(
                (previous) =>
                  previous + res.data[i].notifications.senderNotifications.count
              );
            } else {
              setTotalMessageNotification(
                (previous) =>
                  previous +
                  res.data[i].notifications.receiverNotifications.count
              );
            }
          } else {
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User?.profile?._id]);

  useEffect(() => {
    if (_message.clearMessageNotification) {
      // console.log(_message.clearMessageNotification);
      if (
        _message.clearMessageNotification?.notifications?.senderNotifications
          ?.userId === _User?.profile?._id
      ) {
        setTotalMessageNotification(
          (previous) =>
            previous -
            _message.clearMessageNotification?.notifications
              ?.senderNotifications?.count
        );
      } else {
        setTotalMessageNotification(
          (previous) =>
            previous -
            _message.clearMessageNotification?.notifications
              ?.receiverNotifications?.count
        );
      }
      dispatch({ type: CLEAR_MESSAGE_NOTIFICATION, payload: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_message.clearMessageNotification]);

  useEffect(() => {
    if (arrivalMessage) {
      setTotalMessageNotification((previous) => previous + 1);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (_User?.profile?.notifications?.length) {
      setNotifications(_User?.profile?.notifications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User?.profile?.notifications]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const likeListLink = () => {
    history.push("/like-list");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutUser = () => {
    handleMenuClose();
    setOpenMessages(false);
    history.push("/");
    dispatch(logOut());
    // window.location.reload();
  };

  // const calculateTotalNotifications = () => {
  //   let totalNotifications = 0;
  //   for (let i = 0; i < notifications?.length; i++) {
  //     if (notifications[i]?.count === 1) {
  //       totalNotifications++;
  //     }
  //   }
  //   return totalNotifications;
  // };

  const navItem = () => (
    <Grid item>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        {!responsive && (
          <Grid item>
            <ListLink
              setOpen={setOpen}
              query={responsive}
              setOpenMessages={setOpenMessages}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <>
        <MenuItem onClick={() => likeListLink()}>Like List</MenuItem>
      </>
      {_User.isProfile ? (
        <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
      ) : null}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const handleOpenMessagesDropdown = () => {
    setOpenMessages(!openMessages);
  };

  return (
    <div className={classes.grow}>
      <AppBar style={{ backgroundColor: "#d72924", zIndex: 10 }}>
        <Toolbar style={responsive ? { backgroundColor: "#d72924" } : null}>
          {responsive && (
            <Grid item>
              <IconButton
                onClick={(e) => setOpen(!isOpen)}
                aria-label="Menu"
                style={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          )}
          {!responsive && <img src={Logo} style={LogoStyle} alt="Logo" />}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {!responsive && navItem()}
          <div className={classes.grow} />
          {_User.isProfile ? (
            <div
              className={classes.sectionDesktop}
              style={{ backgroundColor: "#328cc1", paddingRight: "10px" }}
            >
              <IconButton aria-label="show new mails" color="inherit">
                <Badge
                  badgeContent={totalMessageNotification}
                  color="secondary"
                >
                  <MailIcon onClick={() => handleOpenMessagesDropdown()} />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <Link
                to="/login"
                onClick={() => setOpen(!isOpen)}
                className={
                  location.pathname === "/login"
                    ? "link-item-active"
                    : "link-item"
                }
                render="true"
              >
                LOGIN
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                to="/register"
                onClick={() => setOpen(!isOpen)}
                className={
                  location.pathname === "/register"
                    ? "link-item-active"
                    : "link-item"
                }
                render="true"
              >
                REGISTER
              </Link>
            </div>
          )}
          {_User.isProfile ? (
            <div
              className={classes.sectionMobile}
              style={{ backgroundColor: "#328cc1", paddingRight: "10px" }}
            >
              <IconButton aria-label="show new mails" color="inherit">
                <Badge
                  badgeContent={totalMessageNotification}
                  color="secondary"
                >
                  <MailIcon onClick={() => handleOpenMessagesDropdown()} />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <div className={classes.sectionMobile}>
              <Link
                to="/login"
                onClick={() => setOpen(isOpen)}
                className={
                  location.pathname === "/login"
                    ? "link-item-active"
                    : "link-item"
                }
                render="true"
              >
                LOGIN
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                to="/register"
                onClick={() => setOpen(isOpen)}
                className={
                  location.pathname === "/register"
                    ? "link-item-active"
                    : "link-item"
                }
                render="true"
              >
                REGISTER
              </Link>
            </div>
          )}
          <Messages
            open={openMessages}
            setOpen={setOpenMessages}
            onlineUsers={onlineUsers}
            arrivalMessage={arrivalMessage}
            socket={socket}
          />
        </Toolbar>
        {responsive && (
          <ListLink
            setOpen={setOpen}
            query={responsive}
            isOpen={isOpen}
            profileItems={navItem()}
            setOpenMessages={setOpenMessages}
          />
        )}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default TopNav;
