import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useRef} from 'react';

const SearchHeader = ({searchText, handleTextChange}) => {
  const searchRef = useRef(null);
  return (
    <LinearGradient
      style={styles.searchBarContainer}
      colors={['#000', '#000', '#000', 'transparent']}>
      <TouchableOpacity>
        <Text style={styles.backIcon}>{Platform.OS === 'ios' ? '←' : '<'}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchText}
        ref={searchRef}
        placeholder="Search"
        cursorColor="#ccc"
        placeholderTextColor="#ccc"
        selectionColor="#ccc"
        value={searchText}
        onChangeText={handleTextChange}
      />
      <TouchableOpacity
        onPress={() => {
          searchRef.current.focus();
        }}>
        <Image
          style={styles.searchIcon}
          source={require('../assets/icons/search.png')}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  backIcon: {
    color: '#fff',
    fontSize: 25,
    marginRight: 5,
    fontWeight: '700',
    paddingRight: 10,
    textAlignVertical: 'center',
  },
  searchText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'TitilliumWeb-Light',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
