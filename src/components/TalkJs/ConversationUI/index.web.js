import React, { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";

const ConversationUI = ({
  me,
  other,
  ID,
  chatView,
  _height,
}) => {
  const syncUser = useCallback(() => new Talk.User(me), []);


  const syncConversation = useCallback(
    (session) => {
      const otherUser =  new Talk.User(other);
      const conversation = session.getOrCreateConversation((Talk.oneOnOneId(me.id, other.id)));
      conversation.setParticipant(session.me);
      conversation.setParticipant(otherUser);

      return conversation;
    },
    []
  );

  const inboxProps = {
    style: { width: "100%", height: _height,},
    className: "chat-container",
    loadingComponent: (
      <View style={{ height: _height, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#242526" />
      </View>
    ),
    // Add syncConversation prop only if chatView is defined and not empty
    ...(chatView &&{ syncConversation }),
  };

  return (
    <View>
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
