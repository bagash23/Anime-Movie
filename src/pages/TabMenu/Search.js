import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ApiMovie} from '../../config/Api';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../utils/fonts';

const Search = () => {
  const [title, setTitle] = useState('');
  const [dataPencarian, setDataPencarian] = useState([]);
  console.log(dataPencarian);
  const hasil = useRef(null);
  const navigation = useNavigation();

  const tonton = eid => {};

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title != '') {
        ApiMovie.get('/films/search/' + title).then(res => {
          setDataPencarian(res.data);
          hasil.current.classList?.remove('hide');
          hasil.current.classList?.add('hasil');
        });
      } else {
        setDataPencarian([]);
        hasil.current.classList?.remove('hasil');
        hasil.current.classList?.add('hide');
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [title]);

  return (
    <View style={styles.container}>
      <View style={styles.contentInput}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: (Dimensions.get('window').width * 2) / 60,
          }}>
          <AntDesign name="arrowleft" color="#fff" size={20} />
          <Text style={styles.txtPencarian}>Pencarian</Text>
        </TouchableOpacity>
        <TextInput
          ref={hasil}
          onChangeText={e => setTitle(e)}
          placeholder="Cari Anime | Contoh: One Piece "
          style={{
            backgroundColor: '#7F8487',
            paddingHorizontal: (Dimensions.get('window').width * 2) / 80,
            color: '#fff',
          }}
          placeholderTextColor="#fff"
        />

        <FlatList
          data={dataPencarian}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetilAnime', {id: item._id})
                  }
                  key={item._id}
                  style={styles.btnResult}>
                  <Image source={{uri: item.poster}} style={styles.imgAnime} />
                  <Text style={styles.txtAnime}>{item.title}</Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentInput: {
    padding: (Dimensions.get('window').width * 2) / 60,
  },
  txtPencarian: {
    color: '#fff',
    fontFamily: fonts.primary[600],
    marginLeft: (Dimensions.get('window').width * 2) / 80,
  },
  imgAnime: {
    width: (Dimensions.get('window').width * 2) / 20,
    height: (Dimensions.get('window').width * 2) / 20,
    borderRadius: (Dimensions.get('window').width * 2) / 20,
  },
  btnResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: (Dimensions.get('window').width * 2) / 60,
  },
  txtAnime: {
    fontFamily: fonts.primary[400],
    color: '#fff',
    marginLeft: (Dimensions.get('window').width * 2) / 80,
  },
});
