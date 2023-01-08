import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {fonts} from '../utils/fonts';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardView}
      onPress={() => navigation.navigate('DetilAnime', {id: item._id})}>
      <Image style={styles.image} source={{uri: item.poster}} />
      <View style={styles.bg} />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        {item.synopsis?.length > 200 ? (
          showMore ? (
            <View>
              <Text style={styles.itemDeskripsi}>{item.synopsis}</Text>
              <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={styles.seeMore}>Lihat Sedikit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.itemDeskripsi}>
                {`${item.synopsis.slice(0, 80)}... `}
              </Text>
              <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={styles.seeMore}>Lihat Selengkapnya</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Text style={styles.itemDeskripsi}>{item.synopsis}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CarouselItem;
const styles = StyleSheet.create({
  cardView: {
    // flex: 1,
    width: width - 20,
    // height: height - 3,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: fonts.primary[600],
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  itemDeskripsi: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.primary[400],
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,

    elevation: 5,
  },
  bg: {
    backgroundColor: '#000',
    width: width - 20,
    height: height / 3,
    position: 'absolute',
    opacity: 0.2,
    borderRadius: 10,
  },

  seeMore: {
    color: '#fff',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    fontSize: Dimensions.get('window').width * 0.03,
    fontFamily: fonts.primary[400],
  },
});
