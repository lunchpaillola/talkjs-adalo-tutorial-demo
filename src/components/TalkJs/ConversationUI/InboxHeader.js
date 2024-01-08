import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ChevronLeft from './icons/ChevronLeft';

const Header = ({onBackPress}) => {
  return (
    <TouchableOpacity onPress={onBackPress} style={styles.header}>
      <View style={styles.backButton}>
        <ChevronLeft width="16" height="16" color="gray" />
        <Text style={styles.title}> Inbox</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 14,
  },
});

export default Header;
