import React, { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";
import sha256 from "crypto-js/sha256";

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
  } = props;
  const ID = talkJsApplicationID;

  if (editor) {
    return null;
  }

  if (!talkJsApplicationID || !userId) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const me = {
    id: userId,
    name: name,
    email: email,
    photoUrl: photo.uri,
    role: role,
  };

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

  const syncUser = useCallback(() => new Talk.User(me), []);

  const addParticipantsToConversation = (conversation, participantList) => {
    if (participantList && participantList.length > 0) {
      participantList.forEach((participantDetails) => {
        const participant = new Talk.User({
          id: participantDetails?.participantDetails?.pUserId,
          name: participantDetails?.participantDetails?.pName,
          email: participantDetails?.participantDetails?.pEmail,
          photoUrl: participantDetails?.participantDetails?.pPhoto?.uri,
          role: participantDetails?.participantDetails?.pRole,
        });
        conversation.setParticipant(participant);
      });
    }
  };

  const syncConversation = useCallback(
    (session) => {
      const conversationId = createUniqueConversationId(participantList);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(session.me);

      addParticipantsToConversation(conversation, participantList);

      return conversation;
    },
    [participantList]
  );

  const inboxProps = {
    style: { width: "100%", height: 600 },
    className: "chat-container",
    loadingComponent: (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ),
    // Add syncConversation prop only if participantList is defined and not empty
    ...(participantList && participantList.length > 0 && { syncConversation }),
  };

  return (
    <View style={styles.wrapper}>
      <Session appId={ID} syncUser={syncUser}>
        <Inbox {...inboxProps} />
      </Session>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TalkJs;
