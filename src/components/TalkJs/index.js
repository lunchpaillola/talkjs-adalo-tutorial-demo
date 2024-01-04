import React from 'react'
import { View, StyleSheet } from 'react-native'
import sha256 from "crypto-js/sha256";
import * as TalkRn from '@talkjs/react-native';

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

 const me = {
		id: userId,
		name: name,
		email: email,
		photoUrl: photo.uri,
};

if (!talkJsApplicationID || !userId) {
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

const addParticipantsToConversation = (conversation, participantList) => {
	if (participantList && participantList.length > 0) {
			participantList.forEach((participantDetails) => {
					const participant = new TalkRn.User({
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

const conversationId = createUniqueConversationId(participantList);
const conversation = TalkRn.getConversationBuilder(conversationId);

conversation.setParticipant(me);
addParticipantsToConversation(conversation, participantList);



	return(
		<View style={styles.wrapper}>
			<TalkRn.Session appId={ID} me={me}>
			<TalkRn.Chatbox conversationBuilder={conversation} />
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