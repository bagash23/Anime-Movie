import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ApiMovie} from '../../config/Api';
import Feather from 'react-native-vector-icons/Feather';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import CarouselResult from '../../components/CarouselResult';
import Icon from 'react-native-vector-icons/FontAwesome';

const Beranda = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAnime = async () => {
    await ApiMovie.get('films', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (loading) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAnime();
  }, []);

  const [textWaktu, setTextWaktu] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 3 && hours < 12) {
        setTextWaktu('Selamat Pagi');
      } else if (hours >= 12 && hours < 15) {
        setTextWaktu('Selamat Siang');
      } else if (hours >= 15 && hours < 18) {
        setTextWaktu('Selamat Sore');
      } else if (hours >= 18 && hours < 24) {
        setTextWaktu('Selamat Malam');
      } else if (hours >= 0 && hours < 3) {
        setTextWaktu('Selamat Malam');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.contentLoading}>
          <Text style={styles.txtLoading1}>Memuat Data</Text>
          <Text style={styles.txtLoading2}>Tunggu sebentar ya ges...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={{
                  uri: 'https://animey.vercel.app/static/media/logo-text.936d15ad5281e2fe5909.png',
                }}
                style={styles.logo}
              />
              <Icon
                name="book"
                color="#fff"
                size={20}
                onPress={() => navigation.navigate('JadwalRilis')}
              />
            </View>
            <View
              style={{
                marginTop: (Dimensions.get('window').width * 2) / 60,
              }}>
              <Text
                style={{
                  fontFamily: fonts.primary[400],
                  color: '#fff',
                  fontSize: (Dimensions.get('window').width * 2) / 50,
                }}>
                {' '}
                Hai 👋,{' '}
                <Text
                  style={{
                    color: '#FAcc15',
                    fontFamily: fonts.primary[600],
                  }}>
                  {textWaktu}
                </Text>
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: fonts.primary[600],
                  fontSize: (Dimensions.get('window').width * 2) / 40,
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
              <Text
                style={{
                  color: '#EEEEEE',
                  fontFamily: fonts.primary[400],
                  fontSize: (Dimensions.get('window').width * 2) / 50,
                }}>
                Nonton anime subtitle Indonesia secara gratis dan bebas iklan.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: (Dimensions.get('window').width * 2) / 60,
                  borderRadius: (Dimensions.get('window').width * 1) / 100,
                  marginVertical: (Dimensions.get('window').width * 2) / 70,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('Search')}>
                <Text
                  style={{
                    fontFamily: fonts.primary[600],
                    color: '#000',
                  }}>
                  Pencarian Streaming Anime
                </Text>
                <Icon name="film" color="#000" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentGenre}>
            <Text style={styles.txtGenre}>Mulai Streaming Sekrang</Text>
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  style={styles.contentPoster}
                  key={index}
                  onPress={() =>
                    navigation.navigate('DetilAnime', {id: item._id})
                  }>
                  <Image
                    source={{uri: item.poster}}
                    style={styles.posterFilm}
                    resizeMode="stretch"
                  />
                  <Text style={styles.judulFilm}>{`${item.title.slice(
                    0,
                    10,
                  )}...`}</Text>
                  <Text style={styles.txtKategori}>{`${item.category.slice(
                    0,
                    2,
                  )}`}</Text>
                </Pressable>
              );
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: (Dimensions.get('window').width * 2) / 100,
  },
  logo: {
    width: (Dimensions.get('window').width * 2) / 12,
    height: (Dimensions.get('window').width * 2) / 20,
  },
  posterFilm: {
    width: (Dimensions.get('window').width * 2) / 7,
    height: (Dimensions.get('window').width * 2) / 5,
    borderRadius: (Dimensions.get('window').width * 2) / 80,
  },
  contentPoster: {
    padding: (Dimensions.get('window').width * 2) / 100,
  },
  judulFilm: {
    fontFamily: fonts.primary[600],
    color: '#fff',
    fontSize: (Dimensions.get('window').width * 2) / 60,
  },
  contentGenre: {
    margin: (Dimensions.get('window').width * 2) / 100,
  },
  txtGenre: {
    fontFamily: fonts.primary[600],
    color: '#facc15',
    fontSize: (Dimensions.get('window').width * 2) / 50,
    zIndex: 3,
  },
  txtKategori: {
    fontSize: (Dimensions.get('window').width * 2) / 80,
    fontFamily: fonts.primary[400],
    color: '#facc15',
  },
  contentLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtLoading1: {
    color: '#facc15',
    fontFamily: fonts.primary[600],
    fontSize: (Dimensions.get('window').width * 2) / 50,
  },
  txtLoading2: {
    color: '#facc15',
    fontFamily: fonts.primary[400],
    fontSize: (Dimensions.get('window').width * 2) / 50,
  },
});

export default Beranda;
