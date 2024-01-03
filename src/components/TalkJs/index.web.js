import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";

const TalkJs = (props) => {
  const { talkJsApplicationID, userId, name, email, photo } = props;

		const me = {
			id: userId,
			name: name,
			email: email,
			photoUrl: photo.uri,
	};

	const ID = talkJsApplicationID;
	const other = {
			id: 987654321,
			name: "Sarah",
			email: "lola.ojabowale@gmail.com",
			photoUrl: "https://talkjs.com/images/avatar-5.jpg",
	};

  const syncUser = useCallback(() => new Talk.User(me), []);

		const syncConversation = useCallback((session) => {
			// JavaScript SDK code here
			const conversation = session.getOrCreateConversation('welcome');

			const other = new Talk.User({
					id: 'frank',
					name: 'Frank',
					email: 'frank@example.com',
					photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
					welcomeMessage: 'Hey, how can I help?',
					role: 'default',
			});
			conversation.setParticipant(session.me);
			conversation.setParticipant(other);

			return conversation;
	}, []);


  return (
    <View style={styles.wrapper}>
      <Session appId={ID} syncUser={syncUser}>
        <Chatbox syncConversation={syncConversation} style={{ width: '100%', height: '500px' }} />
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

export default TalkJs;
