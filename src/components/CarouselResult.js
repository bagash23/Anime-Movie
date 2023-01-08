import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ApiMovie} from '../config/Api';
import CarouselItem from './CarouselItem';
import {Animated} from 'react-native';

const {width, height} = Dimensions.get('window');

const CarouselResult = () => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [data, setData] = useState([]);
  const getAnime = async () => {
    await ApiMovie.get('films', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(data);

  useEffect(() => {
    getAnime();
  }, []);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}}},
          ])}
        />
        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: '#fff',
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
};

export default CarouselResult;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
