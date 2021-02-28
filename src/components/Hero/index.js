import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import ImageHero from '../../assets/images/hero.png';

const Hero = () => {
  return (
    <View>
      <Text style={styles.heroText}>Nearest Cinema, Newest Movie,</Text>
      <Text style={styles.heroTitle}>Find out now!</Text>
      <Image source={ImageHero} style={styles.hero} />
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  hero: {
    width: 310,
    height: 340,
    marginBottom: 100,
  },
  heroText: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD',
    marginTop: 57,
  },
  heroTitle: {
    fontSize: 40,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA',
    marginBottom: 64,
  },
});
