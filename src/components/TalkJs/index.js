import React, { useState, useEffect } from "react";
import {Image} from "react-native";
import ConversationUI from "./ConversationUI";
import editorImage from "./EditorImage.png";

const TalkJs = (props) => {
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
        id: userId,
        name: name,
        email: email,
        photoUrl: photo?.uri,
        role: role,
      });
    }
  }, [pUserId, pName, pEmail, pPhoto]);

  //actually this can be further down :)
  if (editor) {
    return (
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
    );
  }

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
      ) : (
        <ConversationUI
          me={me}
          other={other}
          ID={talkJsApplicationID}
          _height={_height}
          inboxHeaderColor={inboxHeaderColor}
          inboxFontColor={inboxFontColor}
          loadingColor={loadingColor}
        />
      )}
    </>
  );
};

export default TalkJs;