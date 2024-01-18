import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import * as TalkRn from '@talkjs/react-native';
import Header from './InboxHeader';

const ConversationUI = ({
  me,
  other,
  ID,
  _height,
}) => {
  const [conversationBuilder, setConversationBuilder] = useState(null);
  const [showConversationList, setShowConversationList] = useState(null);

  useEffect(() => {
    if (!other) {
      setShowConversationList(true);
    } else {
      const builder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me.Id, other.Id));
      builder.setParticipant(me);
      builder.setParticipant(other);
      setConversationBuilder(builder);
    }
  }, [me, other]);

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
            <TalkRn.ConversationList
              onSelectConversation={onSelectConversation}
              loadingComponent={
                <View>
                  <ActivityIndicator size="large" color="#242526" />
                </View>
              }
            />
          ) : (
            conversationBuilder && (
              <>
                <Header onBackPress={onBackPress}/>
                <TalkRn.Chatbox
                  conversationBuilder={conversationBuilder}
                  loadingComponent={
                    <View>
                      <ActivityIndicator size="large" color="#242526" />
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
