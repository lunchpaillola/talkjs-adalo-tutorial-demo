import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as TalkRn from '@talkjs/react-native';

const TalkJs = (props) => {
	const { talkJsApplicationID, userId, name, email, photo } = props

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

const conversationBuilder = TalkRn.getConversationBuilder(
	TalkRn.oneOnOneId(me, other)
);

conversationBuilder.setParticipant(me);
conversationBuilder.setParticipant(other);

	return(
		<View style={styles.wrapper}>
			<TalkRn.Session appId={ID} me={me}>
			<TalkRn.Chatbox conversationBuilder={conversationBuilder} />
			</TalkRn.Session>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default TalkJs