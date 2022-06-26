/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const images = [
  {
    id: 1,
    url: 'https://picsum.photos/id/1/500/500',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/2/500/500',
  },
  {
    id: 3,
    url: 'https://picsum.photos/id/3/500/500',
  },
  {
    id: 4,
    url: 'https://picsum.photos/id/4/500/500',
  },
  {
    id: 5,
    url: 'https://picsum.photos/id/5/500/500',
  },
];

const OnBoardingItem = ({item}) => {
  return <Image source={{uri: item.url}} style={styles.image} />;
};

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = event => {
    setActiveIndex(parseInt(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <OnBoardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{maxHeight: width}}
        scrollEventThrottle={16}
        onMomentumScrollEnd={event => handleMomentumScrollEnd(event)}
      />

      {images.length > 1 ? (
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View
              style={[
                styles.dot,
                {backgroundColor: index === activeIndex ? 'blue' : 'gray'},
              ]}
            />
          ))}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width,
    height: width,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
});

export default ImageSlider;

// pagingEnabled: se false, ao ter evento de scroll(Horizontal) ele se comporta com uma rolagem que permite
// passar varias imagens de uma vez, caso for true, você so consegue ver uma imagem a cada ação de scroll

//onMomentumScrollEnd
// event.nativeEvent.contentOffset.x: pega a largura de todas as imagens que foram passadas, soma sua largura
// width: largura de cada imagem
// o retorno dessa divisão é o activeIndex
