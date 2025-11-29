import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodCard = ({ emoji, label, selected }) => {
  return (
    <View style={[styles.card, selected && styles.selected]}>      
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 160,
    backgroundColor: '#FFCC99',
    borderRadius: 28,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFCC99',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 6,
  },
  selected: {
    backgroundColor: '#D8CCF2',
  },
  emoji: {
    fontSize: 50,
    marginBottom: 14,
  },
  label: {
    fontSize: 20,
    color: '#222222',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default MoodCard;
