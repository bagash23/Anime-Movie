import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Beranda');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://animey.vercel.app/static/media/logo-text.936d15ad5281e2fe5909.png',
        }}
        style={styles.logo}
      />
      <Text
        style={{
          color: '#fff',
          fontFamily: fonts.primary[600],
          fontSize: (Dimensions.get('window').width * 2) / 40,
          marginTop: (Dimensions.get('window').width * 2) / 40,
        }}>
        <Text
          style={{
            color: '#FAcc15',
            fontFamily: fonts.primary[600],
            fontSize: (Dimensions.get('window').width * 2) / 40,
          }}>
          Yapp X
        </Text>{' '}
        Streaming
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: (Dimensions.get('window').width * 2) / 7,
    height: (Dimensions.get('window').height * 2) / 25,
  },
});
