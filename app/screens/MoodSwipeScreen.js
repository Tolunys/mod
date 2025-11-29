import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import MoodCard from '../components/MoodCard';
import { createTranslator } from '../i18n/translations';

const moods = [
  { key: 'Calm', emoji: '🫧' },
  { key: 'Anxious', emoji: '😰' },
  { key: 'Sad', emoji: '🥲' },
  { key: 'Angry', emoji: '😠' },
  { key: 'Stressed', emoji: '😣' },
  { key: 'Tired', emoji: '😴' },
  { key: 'Happy', emoji: '😊' },
];

export default function MoodSwipeScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  const { mood, setMood } = useContext(MoodContext);
  const [selected, setSelected] = useState(mood || 'Calm');
  const t = createTranslator(language);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('micro_therapy')}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          data={moods}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item.key)}
              activeOpacity={0.8}
            >
              <MoodCard
                emoji={item.emoji}
                label={t(`moods.${item.key}`)}
                selected={item.key === selected}
              />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => { setMood(selected); navigation.navigate('MicroTherapy', { mood: selected }); }}
        >
          <Text style={styles.continueText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7FA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: 0.3,
    color: '#222222',
  },
  carousel: {
    paddingVertical: 20,
    paddingHorizontal: 22,
  },
  continueBtn: {
    marginTop: 28,
    backgroundColor: '#B8E6D1',
    borderRadius: 16,
    paddingHorizontal: 38,
    paddingVertical: 14,
    shadowColor: '#B8E6D1',
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 9,
    elevation: 4,
  },
  continueText: {
    color: '#222222',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
