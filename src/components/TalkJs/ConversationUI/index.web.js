import React, { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";

const ConversationUI = ({
  me,
  ID,
  participantList,
  conversationId,
  addParticipantsToConversation,
}) => {
  const syncUser = useCallback(() => new Talk.User(me), []);

  const syncConversation = useCallback(
    (session) => {
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(session.me);

      addParticipantsToConversation(Talk, conversation, participantList, false);

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
    ...(participantList?.length > 0 && { syncConversation }),
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

export default ConversationUI;
