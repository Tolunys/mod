import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TherapyCard = ({ emoji, title, sentence }) => (
  <View style={styles.card}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.sentence}>{sentence}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 26,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    shadowColor: '#D8CCF2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.11,
    shadowRadius: 14,
    elevation: 7,
    marginBottom: 38,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 14,
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 6,
    color: '#222222',
    textAlign: 'center'
  },
  sentence: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginTop: 7,
  },
});

export default TherapyCard;
