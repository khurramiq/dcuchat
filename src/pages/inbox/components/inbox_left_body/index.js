import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatListItem from "./components/chat-list-item";
import SearchedItem from "./components/chat-list-item/searchedItem";
import ChatList from "./components/chat_list";
import "./style.css";
import { messageConstants } from "../../../../redux/constants";
const { CLEAR_MESSAGE_NOTIFICATION } = messageConstants;

const InboxLeftBody = ({
  conversations,
  setCurrentChat,
  setChatOppositUser,
  currentOpenChat,
  onlineUsers,
  searchText,
  setSearchedUser,
  setSearchText,
  clearNotifications,
  setMessages,
}) => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const handleSearchUserSelect = (u) => {
    setSearchedUser(u);
    setSearchText("");
    setMessages([]);
  };

  // Filtered Students
  const filteredStudents = () => {
    // return _User.searchStudents.filter(item => !conversations.includes(item));
    // for (let i = 0; i < _User.searchStudents.length; i++) {
    //   let exist = false;
    //   for (let j = 0; j < conversations.length; j++) {
    //     if (conversations[j].members.includes(_User.searchStudents[i]._id)) {
    //       exist = true;
    //     }
    //   }
    //   if (!exist) {
    //     newArray.push(_User.searchStudents[i]);
    //     exist = false;
    //   }
    // }
    let newArr = [];
    for (let i = 0; i < _User.allUsers.length; i++) {
      for (let j = 0; j < _User.profile.likeList.length; j++) {
        if (_User.profile.likeList[j].likePersonId === _User.allUsers[i]._id) {
          newArr.push(_User.allUsers[i]);
        }
      }
    }
    let newArray = [];
    for (let i = 0; i < newArr.length; i++) {
      let exist = false;
      for (let j = 0; j < conversations.length; j++) {
        if (conversations[j].members.includes(newArr[i]._id)) {
          exist = true;
        }
      }
      if (!exist) {
        newArray.push(newArr[i]);
        exist = false;
      }
    }
    return newArray;
  };
  // Filtered Admins
  // const filteredAdmins = () => {
  //   let newArray = [];
  //   for (let i = 0; i < _User.allAdmins.length; i++) {
  //     let exist = false;
  //     for (let j = 0; j < conversations.length; j++) {
  //       if (conversations[j].members.includes(_User.allAdmins[i]._id)) {
  //         exist = true;
  //       }
  //     }
  //     if (!exist) {
  //       newArray.push(_User.allAdmins[i]);
  //       exist = false;
  //     }
  //   }
  //   return newArray;
  // };

  const clear_Notifications = (c) => {
    clearNotifications(c._id, _User?.profile?._id);
    setCurrentChat(c);
    dispatch({ type: CLEAR_MESSAGE_NOTIFICATION, payload: c });
  };

  console.log("conversations", conversations);

  return (
    <div className="inbox-left-body-wrapper">
      {
        true ? (
          <>
            <ChatList>
              {filteredStudents().map((u, i) => (
                <div onClick={() => handleSearchUserSelect(u)}>
                  <SearchedItem user={u} />
                </div>
              ))}
              {conversations.map((c) => (
                <div onClick={() => clear_Notifications(c)}>
                  <ChatListItem
                    recent={currentOpenChat?._id === c._id ? true : false}
                    conversation={c}
                    currentUser={_User.profile}
                    setChatOppositUser={setChatOppositUser}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </ChatList>
          </>
        ) : null

        //   searchText.length > 0 ? (
        //   _User.searchStudentsLoading ? (
        //     <p>Loading...</p>
        //   ) : (
        //     <ChatList>
        //       {filteredStudents().map((u, i) => (
        //         <div onClick={() => handleSearchUserSelect(u)}>
        //           <SearchedItem user={u} />
        //         </div>
        //       ))}
        //     </ChatList>
        //   )
        // ) : (
        //   <ChatList>
        //     {conversations.map((c) => (
        //       <div onClick={() => clear_Notifications(c)}>
        //         <ChatListItem
        //           recent={currentOpenChat?._id === c._id ? true : false}
        //           conversation={c}
        //           currentUser={_User.profile}
        //           setChatOppositUser={setChatOppositUser}
        //           onlineUsers={onlineUsers}
        //         />
        //       </div>
        //     ))}
        //   </ChatList>
        // )
      }
      {}
    </div>
  );
};

export default InboxLeftBody;
