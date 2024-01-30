import React, { useState, useEffect } from "react";
import {Image, View, ActivityIndicator} from "react-native";
import ConversationUI from "./ConversationUI";
import editorImage from "./EditorImage.png";

const ChatView = (props) => {
  const {
    editor,
    talkJsApplicationID,
    userId,
    name,
    email,
    photo,
    pName,
    pUserId,
    pEmail,
    pPhoto,
    _height,
    chatView
  } = props;

  const [me, setMe] = useState(null);
  const [other, setOther] = useState(null);
  
  useEffect(() => {
    if (userId && name) {
      setMe({
        id: userId,
        name: name,
        email: email,
        photoUrl: photo?.uri,
      });
    }
  }, [userId, name, email]);

  useEffect(() => {
    if (pUserId && pName) {
      setOther({
        id: pUserId,
        name: pName,
        email: pEmail,
        photoUrl: pPhoto?.uri,
      });
    }
  }, [pUserId, pName, pEmail, pPhoto]);

  return (
    <>
      {editor ? (
        <Image
          source={editorImage}
          style={{
            flex: 1,
            height: _height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
        />
      ) : !me || (chatView && !other) ? (
        <View style={{ height: _height, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#242526" />
        </View>
      ) : (
        <ConversationUI
          me={me}
          other={other}
          ID={talkJsApplicationID}
          _height={_height}
          chatView={chatView}
        />
      )}
    </>
  );
  
};

export default ChatView;
