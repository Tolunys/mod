import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing, SafeAreaView } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import TherapyCard from '../components/TherapyCard';
import { createTranslator } from '../i18n/translations';

const moods = {
  Calm: '🫧',
  Anxious: '😰',
  Sad: '🥲',
  Angry: '😠',
  Stressed: '😣',
  Tired: '😴',
  Happy: '😊',
};

export default function MicroTherapyScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);
  const t = createTranslator(language);
  const { mood: globalMood } = useContext(MoodContext);
  const mood = route?.params?.mood || globalMood || 'Calm';
  const [timerDone, setTimerDone] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const duration = 12000;

  useEffect(() => {
    setTimerDone(false);
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => setTimerDone(true));
  }, [mood, language]);

  const circleInterpolation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.progressWrap}>
          <Animated.View style={[styles.circleProgress, { transform: [{ rotate: circleInterpolation }] }]} />
          <View style={styles.progressCenter}>
            <TherapyCard
              emoji={moods[mood]}
              title={t(`moods.${mood}`)}
              sentence={t(`therapy.${mood}`)}
            />
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, { opacity: timerDone ? 1 : 0.55 }]}
            onPress={() => {
              if (timerDone) navigation.goBack();
            }}
            disabled={!timerDone}
          >
            <Text style={styles.btnText}>{t('back')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { opacity: timerDone ? 1 : 0.55 }]}
            onPress={() => {
              if (timerDone) {
                setTimerDone(false);
                anim.setValue(0);
                Animated.timing(anim, {
                  toValue: 1,
                  duration,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start(() => setTimerDone(true));
              }
            }}
            disabled={!timerDone}
          >
            <Text style={styles.btnText}>{t('again')}</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 38,
  },
  progressWrap: {
    height: 310,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  progressCenter: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleProgress: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    borderWidth: 7,
    borderColor: '#D8CCF2', // lavender
    opacity: 0.38,
    borderStyle: 'dashed',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    width: 220,
  },
  btn: {
    backgroundColor: '#FFCC99',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 7,
    shadowColor: '#FFCC99',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  btnText: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
  },
});
