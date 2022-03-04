import React, {
  Fragment,
  Suspense,
  useEffect,
  lazy,
  useRef,
  useState,
} from "react";
import { getCurrentUser } from "./redux/actions/userActions";
import { connect, useSelector } from "react-redux";

import { io } from "socket.io-client";
import SnackBar from "./components/alerts/successMessage";
import { CircularProgress, Container } from "@material-ui/core";
import Private from "./routes/private";
import Footer from "./components/footer";
// import CircularProgress from "@material-ui/core/CircularProgress";
const Topnav = lazy(() => import("./components/topNav"));
const Public = lazy(() => import("./routes/public"));
// const Private = lazy(() => import("./routes/private"));

const App = ({ Auth, getCurrentUser, isLoading, profile }) => {
  const socket = useRef();
  const _User = useSelector((state) => state.User);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", _User?.profile?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [_User.profile]);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentUser]);

  return (
    <Suspense fallback={<Fragment />}>
      {!Auth && !isLoading ? (
        <>
          <Topnav socket={socket} />
          <Public socket={socket} />
          <Footer />
        </>
      ) : Auth && profile && !isLoading ? (
        <>
          <Container
            style={{
              minHeight: "100vh",
              maxWidth: "1440px",
              padding: "0",
              margin: "0 auto",
            }}
          >
            <Topnav
              onlineUsers={onlineUsers}
              arrivalMessage={arrivalMessage}
              socket={socket}
            />
            <Private
              onlineUsers={onlineUsers}
              arrivalMessage={arrivalMessage}
              socket={socket}
            />
            <Footer />
          </Container>
        </>
      ) : (
        <Container
          fluid="true"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" size="6rem" />
        </Container>
      )}
      <SnackBar />
    </Suspense>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.User.Auth,
    isLoading: state.User.isLoading,
    profile: state.User.profile,
  };
};

export default connect(mapStateToProps, { getCurrentUser })(App);
