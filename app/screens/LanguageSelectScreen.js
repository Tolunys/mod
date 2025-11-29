import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { createTranslator } from '../i18n/translations';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'de', label: 'Deutsch' }
];

export default function LanguageSelectScreen({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = createTranslator(language);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('select_language')}</Text>
      <View style={styles.options}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => { setLanguage(lang.code); navigation.replace('CalmDot'); }}
            style={[styles.button, language === lang.code && styles.activeButton]}
          >
            <Text style={styles.buttonText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 32,
  },
  options: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 220,
    backgroundColor: '#B8E6D1',
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    shadowColor: '#B8E6D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  activeButton: {
    backgroundColor: '#D8CCF2',
  },
  buttonText: {
    fontSize: 22,
    color: '#222222',
    fontWeight: '500',
    textAlign: 'center',
  },
});
