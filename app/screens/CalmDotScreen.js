import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import DotAnimation from '../components/DotAnimation';
import { createTranslator } from '../i18n/translations';

export default function CalmDotScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  const t = createTranslator(language);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <DotAnimation />
        <TouchableOpacity onPress={() => navigation.navigate('MoodSwipe')}>
          <Text style={styles.subtitle}>{t('swipe_to_choose')}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.resetBtn} onPress={() => {}}>
          <Text style={styles.resetText}>{t('reset_30s')}</Text>
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
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#222222',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: '#FFCC99',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    shadowColor: '#FFCC99',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  resetBtn: {
    backgroundColor: '#B8E6D1',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 38,
    marginBottom: 34,
    shadowColor: '#B8E6D1',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  resetText: {
    color: '#222222',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
