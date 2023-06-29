import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Image from 'react-native-fast-image';
import React, {useState} from 'react';
const {width} = Dimensions.get('window');

const RenderImageItem = ({item}) => {
  const [error, setError] = useState(false);
  const imagePath = `https://li-ji-n.github.io/imageData/${item['poster-image']}`;
  return (
    <View style={styles.renderItem}>
      {error ? (
        <View style={styles.errorImage}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: imagePath,
            priority: Image.priority.high,
          }}
          onError={() => setError(true)}
        />
      )}
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
    </View>
  );
};
export default RenderImageItem;
const styles = StyleSheet.create({
  renderItem: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 10,
    width: (width - 80) / 3,
  },
  errorImage: {
    width: '100%',
    marginVertical: 5,
    aspectRatio: 0.669,
    justifyContent: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 2,
    fontFamily: 'TitilliumWeb-Light',
  },
  image: {
    width: '100%',
    marginVertical: 5,
    aspectRatio: 0.669,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'TitilliumWeb-Light',
  },
});
