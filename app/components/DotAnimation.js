import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const DotAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.27,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.0,
          duration: 4000,
          useNativeDriver: true,
        })
      ]).start(() => animate());
    };
    animate();
  }, [scale]);

  return (
    <View style={styles.centerBox}>
      <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  dot: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#B8E6D1', // Theme mint
    shadowColor: '#B8E6D1',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.17,
    shadowRadius: 28,
    elevation: 12,
  },
});

export default DotAnimation;
