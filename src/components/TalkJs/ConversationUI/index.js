import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import * as TalkRn from '@talkjs/react-native';
import ConversationList from './ConversationList';
import Header from './InboxHeader';

const ConversationUI = ({
  me,
  ID,
  participantList,
  conversationId,
  addParticipantsToConversation,
  _height,
}) => {
  const [conversationBuilder, setConversationBuilder] = useState(null);
  const [showConversationList, setShowConversationList] = useState(null);

  useEffect(() => {
    if (!conversationId || participantList.length === 0) {
      setShowConversationList(false);
    } else {
      const builder = TalkRn.getConversationBuilder(conversationId);
      builder.setParticipant(me);
      addParticipantsToConversation(TalkRn, builder, participantList, true);
      setConversationBuilder(builder);
    }
  }, [conversationId, me, participantList]);

  const onSelectConversation = event => {
    setConversationBuilder(event.conversation);
  };

  const onBackPress = () => {
    setShowConversationList(true);
  };

  return (
    <>
      <TalkRn.Session appId={ID} me={me}>
        <View style={{height: _height}}>
          {showConversationList ? (
            <ConversationList
              onSelectConversation={onSelectConversation}
              loadingComponent={
                <View>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              }
            />
          ) : (
            conversationBuilder && (
              <>
                <Header onBackPress={onBackPress} />
                <TalkRn.Chatbox
                  conversationBuilder={conversationBuilder}
                  loadingComponent={
                    <View>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  }
                />
              </>
            )
          )}
        </View>
      </TalkRn.Session>
    </>
  );
};

export default ConversationUI;
