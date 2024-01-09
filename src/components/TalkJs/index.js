import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import ConversationUI from "./ConversationUI";
import sha256 from "crypto-js/sha256";
import editorImage from "./EditorImage.png";

const TalkJs = (props) => {
  const {
    editor,
    talkJsApplicationID,
    userId,
    name,
    email,
    photo,
    participantList,
    role,
    _height,
  } = props;
  const ID = talkJsApplicationID;
  const [me, setMe] = useState(null);
  useEffect(() => {
    if (userId && name) {
      setMe({
        id: userId,
        name: name,
        email: email,
        photoUrl: photo?.uri,
        role: role,
      });
    }
  }, [userId, name, email, role]);

  if (editor) {
    //later will flesh this out with my editor code
    return (
      <Image
        source={editorImage} // Set the source to your imported image
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

  if (!talkJsApplicationID || !userId || !name) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!me || !ID) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const createUniqueConversationId = (participantList) => {
    const userIds = Array.from(
      new Set(
        participantList.map(
          (participant) => participant?.participantDetails?.pUserId
        )
      )
    ).sort((a, b) => a - b);

    const uniqueSortedIds = Array.from(new Set(userIds)).sort();
    const concatenatedIds = uniqueSortedIds.join("-");
    const hash = sha256(concatenatedIds);

    return hash.toString();
  };

  let conversationId;
  if (participantList) {
    conversationId = createUniqueConversationId(participantList);
  }

  const addParticipantsToConversation = (
    TalkLibrary,
    conversation,
    participantList,
    isNative
  ) => {
    if (participantList && participantList.length > 0) {
      participantList.forEach((participantDetails) => {
        let participant;
        const participantObject = {
          id: participantDetails?.participantDetails?.pUserId,
          name: participantDetails?.participantDetails?.pName,
          email: participantDetails?.participantDetails?.pEmail,
          photoUrl: participantDetails?.participantDetails?.pPhoto.uri,
          role: participantDetails?.participantDetails?.pRole,
        };
        if (isNative) {
          participant = participantObject;
        } else {
          participant = new TalkLibrary.User(participantObject);
        }
        conversation.setParticipant(participant);
      });
    }
  };

  return (
    <ConversationUI
      conversationId={conversationId}
      me={me}
      participantList={participantList}
      ID={talkJsApplicationID}
      addParticipantsToConversation={addParticipantsToConversation}
      _height={_height}
    />
  );
};

export default TalkJs;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
