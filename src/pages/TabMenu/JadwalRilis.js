import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {ApiMovie} from '../../config/Api';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const JadwalRilis = () => {
  const [senins, setSenins] = useState([]);
  const [selasas, setSelasas] = useState([]);
  const [rabus, setRabus] = useState([]);
  const [kamiss, setKamiss] = useState([]);
  const [jumats, setJumats] = useState([]);
  const [sabtus, setSabtus] = useState([]);
  const [minggus, setMinggus] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    ApiMovie.get('/films/jadwal').then(res => {
      var x = 0;
      res.data.film.forEach(el => {
        let date = new Date(el.updated_at);
        date.getDay() == 0 && minggus.push(el);
        date.getDay() == 1 && senins.push(el);
        date.getDay() == 2 && selasas.push(el);
        date.getDay() == 3 && rabus.push(el);
        date.getDay() == 4 && kamiss.push(el);
        date.getDay() == 5 && jumats.push(el);
        date.getDay() == 6 && sabtus.push(el);
        x++;
        if (res.data.film.length == x) {
          setLoading(false);
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.contentLoading}>
          <Text style={styles.txtLoading1}>Memuat Data</Text>
          <Text style={styles.txtLoading2}>Tunggu sebentar ya ges...</Text>
        </View>
      ) : (
        <View style={styles.viewDay}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Senin</Text>
              {senins.length > 0 ? (
                <FlatList
                  data={senins}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Selasa</Text>
              {selasas.length > 0 ? (
                <FlatList
                  data={selasas}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Rabu</Text>
              {rabus.length > 0 ? (
                <FlatList
                  data={rabus}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Kamis</Text>
              {kamiss.length > 0 ? (
                <FlatList
                  data={kamiss}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Jumat</Text>
              {jumats.length > 0 ? (
                <FlatList
                  data={jumats}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Sabtu</Text>
              {sabtus.length > 0 ? (
                <FlatList
                  data={sabtus}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
            <View
              style={{marginBottom: (Dimensions.get('window').width * 2) / 80}}>
              <Text style={styles.txtDay}>Minggu</Text>
              {minggus.length > 0 ? (
                <FlatList
                  data={minggus}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
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
                        <Text
                          style={styles.txtKategori}>{`${item.category.slice(
                          0,
                          2,
                        )}`}</Text>
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <Text style={styles.txtLoading2}>
                  Tidak ada anime tayang hari ini.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default JadwalRilis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  txtDay: {
    color: '#facc15',
    fontFamily: fonts.primary[600],
    fontSize: (Dimensions.get('window').width * 2) / 50,
  },
  viewDay: {
    padding: (Dimensions.get('window').width * 2) / 100,
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
  txtKategori: {
    fontSize: (Dimensions.get('window').width * 2) / 80,
    fontFamily: fonts.primary[400],
    color: '#facc15',
  },
});
