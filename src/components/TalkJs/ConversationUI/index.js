import React from "react";
import { View, StyleSheet } from "react-native";
import * as TalkRn from "@talkjs/react-native";

const ConversationUI = ({
  me,
  ID,
  participantList,
  conversationId,
  addParticipantsToConversation,
}) => {
  const conversation = TalkRn.getConversationBuilder(conversationId);

  conversation.setParticipant(me);
  addParticipantsToConversation(TalkRn, conversation, participantList);

  return (
    <View style={styles.wrapper}>
      <TalkRn.Session appId={ID} me={me}>
        <TalkRn.Chatbox conversationBuilder={conversation} />
      </TalkRn.Session>
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
