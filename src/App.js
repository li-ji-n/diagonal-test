import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import SearchHeader from './components/searchHeader';
import RenderImageItem from './components/renderImageItem';

const App = () => {
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState([]);
  const [listEnd, setListEnd] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const regex = new RegExp(searchText, 'i');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://li-ji-n.github.io/JsonData/CONTENTLISTINGPAGE-PAGE${page}.json`,
      );
      const data = await response.json();
      const {
        'total-content-items': totalContentItems,
        'page-size-returned': pageSizeReturned,
        'content-items': contentItems,
      } = data.page;

      if (
        parseInt(totalContentItems) ===
        listData.length + parseInt(pageSizeReturned)
      ) {
        setListEnd(true);
      }

      setListData(prevListData => [...prevListData, ...contentItems.content]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
      setLoaded(true);
    } catch (error) {
      setIsLoading(false);
      console.log(JSON.stringify(error));
      console.error(error);
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndReached = () => {
    if (!isLoading && !listEnd) {
      fetchData();
    }
  };

  const getRandomKey = name => {
    return name + Math.random().toString(36).substr(2, 9);
  };

  const handleTextChange = text => {
    setSearchText(text);
  };

  const filteredData = listData.filter(item => regex.test(item.name));

  const RenderEmptyComponent = () => {
    useEffect(() => {
      if (searchText && !isLoading && !listEnd) {
        handleEndReached();
      }
    }, []);

    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data found!</Text>
      </View>
    );
  };

  const footerComponent = () => <View style={styles.footer} />;

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        searchText={searchText}
        handleTextChange={handleTextChange}
      />
      {loaded ? (
        <FlatList
          data={filteredData}
          renderItem={({item}) => <RenderImageItem item={item} />}
          numColumns={3}
          style={styles.listStyle}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => getRandomKey(item.name.toString())}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={footerComponent}
          ListEmptyComponent={RenderEmptyComponent}
        />
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={'#fff'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
  },
  footer: {
    height: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
