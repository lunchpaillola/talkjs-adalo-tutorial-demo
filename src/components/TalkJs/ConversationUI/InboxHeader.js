import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ChevronLeft from "./icons/ChevronLeft";

const Header = ({ onBackPress, inboxFontColor, inboxHeaderColor }) => {
  return (
    <TouchableOpacity
      onPress={onBackPress}
      style={[styles.header, { backgroundColor: inboxHeaderColor }]}
    >
      <View style={styles.backButton}>
        <ChevronLeft width="16" height="16" color={inboxFontColor || "gray"} />

        <Text style={[styles.title, { color: inboxFontColor }]}> Inbox</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: "black",
  },
});

export default Header;
