import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ApiMovie} from '../../config/Api';
import {fonts} from '../../utils/fonts';
import MoVideoPlayer from 'react-native-mo-video-player';

const DetilAnime = () => {
  const route = useRoute();
  const dataId = route.params.id;
  console.log(dataId);
  const [listDetil, setistDetil] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDetilId = async () => {
    await ApiMovie.get(`films/${dataId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (loading) {
          setistDetil(res.data);
          setIdVideo(res.data.episodes[0]._id);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetilId();
  }, []);

  const [idVideo, setIdVideo] = useState(null);
  console.log(idVideo, 'ID APA');
  const findVideo = listDetil.episodes?.find(item => item._id === idVideo);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.contentLoading}>
          <Text style={styles.txtLoading1}>Memuat Data</Text>
          <Text style={styles.txtLoading2}>Tunggu sebentar ya ges...</Text>
        </View>
      ) : (
        <ScrollView>
          <MoVideoPlayer
            style={styles.contentVideo}
            source={{uri: findVideo?.video}}
            poster={listDetil.film?.poster}
            autoPlay={false}
            playInBackground={false}
            title={listDetil.film?.title}
            showHeader={true}
            showSeeking10SecondsButton={true}
            showCoverButton={true}
            showFullScreenButton={true}
            showSettingButton={true}
            showMuteButton={true}
          />
          <View style={styles.contenTitle}>
            <FlatList
              data={listDetil.film?.category}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
              renderItem={({item, index}) => (
                <View key={index} style={{marginRight: 12}}>
                  <Text
                    style={{
                      fontSize: (Dimensions.get('window').width * 2) / 70,
                      color: '#facc15',
                      fontFamily: fonts.primary[400],
                    }}>
                    {item}
                  </Text>
                </View>
              )}
            />
            <Text style={styles.txtJudul}>{listDetil.film?.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.txtType}>{listDetil.film?.type}</Text>
              <Text style={styles.txtEps}>{findVideo?.no}</Text>
            </View>
            <Text style={styles.txtSinopsis}>{listDetil.film?.synopsis}</Text>
            <View
              style={{
                marginTop: (Dimensions.get('window').width * 2) / 70,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.txtJudul}>Semua Episode</Text>
                <Text style={styles.txtType}>Eps. {findVideo?.no}</Text>
              </View>
              <FlatList
                data={listDetil.episodes}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.contentBelajar,
                      {
                        borderColor: item._id === idVideo ? '#facc15' : 'grey',
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginRight: (Dimensions.get('window').width * 2) / 80,
                      },
                    ]}
                    onPress={() => setIdVideo(item._id)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.txtJudulEps}>
                        {' '}
                        Episode{' '}
                        <Text style={styles.txtJudulEps}>{item.no}</Text>{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DetilAnime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentVideo: {
    width: Dimensions.get('screen').width,
    height: (Dimensions.get('screen').width * 2) / 3,
  },
  txtJudul: {
    fontSize: (Dimensions.get('window').width * 2) / 40,
    fontFamily: fonts.primary[600],
    color: '#facc15',
  },
  contenTitle: {
    padding: (Dimensions.get('window').width * 2) / 80,
  },
  txtType: {
    fontFamily: fonts.primary[400],
    textTransform: 'capitalize',
    color: '#fff',
  },
  txtEps: {
    fontFamily: fonts.primary[600],
    color: '#fff',
    fontSize: (Dimensions.get('window').width * 2) / 40,
    left: 10,
  },
  txtSinopsis: {
    fontFamily: fonts.primary[400],
    color: '#fff',
    fontSize: (Dimensions.get('window').width * 2) / 70,
    textTransform: 'capitalize',
  },
  contentBelajar: {
    marginTop: Dimensions.get('window').height * 0.01,
  },
  txtJudulEps: {
    fontFamily: fonts.primary[600],
    color: '#fff',
  },
  posterFilm: {
    width: (Dimensions.get('window').width * 2) / 7,
    height: (Dimensions.get('window').width * 2) / 5,
    borderRadius: (Dimensions.get('window').width * 2) / 80,
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
