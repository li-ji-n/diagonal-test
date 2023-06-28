import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';

const {width} = Dimensions.get('window');
const renderImageItem = ({item}) => {
  const imagePath = `file:////Users/lijinp/Documents/Demo/Diagonal/src/assets/images/${item['poster-image']}`;
  return (
    <View style={styles.renderItem}>
      <Image
        style={styles.image}
        source={{
          uri: imagePath,
          priority: Image.priority.normal,
        }}
      />
      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
    </View>
  );
};

const App = () => {
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState([]);
  const [listEnd, setListEnd] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const regex = new RegExp(searchText, 'i');

  const fetchData = async page => {
    try {
      console.log('Called');
      setIsLoading(true);
      const response = await fetch(
        `file:////Users/lijinp/Documents/Demo/Diagonal/src/assets/json/CONTENTLISTINGPAGE-PAGE${page}.json`,
      );
      const data = await response.json();

      const {
        'total-content-items': totalContentItems,
        'page-size-returned': pageSizeReturned,
        'content-items': contentItems,
      } = data.page;
    //   const filteredContentItems = contentItems.content.filter(item =>
    //     regex.test(item.name),
    //   );
      if (
        parseInt(totalContentItems) ===
        listData.length + parseInt(pageSizeReturned)
      ) {
        // if (filteredContentItems.length < 1) {
        //     fetchData(page + 1);
        //   }
        setListEnd(true);
      }

      //   setListData(prev => [...prev, ...filteredContentItems]);
      setListData(prev => [...prev, ...contentItems.content]);
      setPage(prev => prev + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const filteredData = listData.filter(item => regex.test(item.name));
  useEffect(() => {
    fetchData(page);
  }, []);
  const handleEndReached = () => {
    if (!isLoading && !listEnd) {
      fetchData(page);
    }
  };
  function getRandomKey(name) {
    return name + Math.random().toString(36).substr(2, 9);
  }
  const handleTextChange = text => {
    setSearchText(text);
  };
  const renderEmptyComponent = () => {
    if (searchText && !isLoading && !listEnd) {
      handleEndReached();
    }
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data found!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.searchBarContainer}
        colors={['#000', '#000', '#000', 'transparent']}>
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          value={searchText}
          onChangeText={handleTextChange}
        />
        <Image
          style={styles.searchIcon}
          source={require('./assets/images/search.png')}
        />
      </LinearGradient>
      <FlatList
        data={filteredData}
        // data={listData}
        renderItem={renderImageItem}
        numColumns={3}
        style={styles.listStyle}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => getRandomKey(item.name.toString())}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={<View style={{height: 20}} />}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 40,
  },
  searchBarContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  searchText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  listStyle: {
    marginTop: -30,
    paddingTop: 10,
    backgroundColor: '#000',
    height: '100%',
  },
  listContainer: {
    flexGrow: 1,
  },
  renderItem: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 15,
    width: (width - 90) / 3,
    // backgroundColor: 'red',
  },
  image: {
    width: '100%',
    aspectRatio: 0.669,
    marginVertical: 5,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#fff',
    fontSize: 14,
  },
});
