import React, { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";

const ConversationUI = ({
  me,
  other,
  ID,
  _height,
}) => {
  const syncUser = useCallback(() => new Talk.User(me), []);


  const syncConversation = useCallback(
    (session) => {
      const otherUser =  new Talk.User(other);
      const conversation = session.getOrCreateConversation((Talk.oneOnOneId(me.Id, other.Id)));
      conversation.setParticipant(session.me);
      conversation.setParticipant(otherUser);

      return conversation;
    },
    []
  );

  const inboxProps = {
    style: { width: "100%", height: _height },
    className: "chat-container",
    loadingComponent: (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#242526" />
      </View>
    ),
    // Add syncConversation prop only if participantList is defined and not empty
    ...(other && { syncConversation }),
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
});

export default ConversationUI;
