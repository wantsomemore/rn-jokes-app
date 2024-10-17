import {FavIcon} from '@/assets/icons/Fav';
import {FavFilledIcon} from '@/assets/icons/FavFilled';
import {EJokeType} from '@/enums/EJokeType';
import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {IJoke} from '@/interfaces/IJoke';
import {jokesActions} from '@/store/reducers/JokesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';

export default function JokesHistory() {
  const dispatch = useAppDispatch();
  const {jokesHistory} = useAppSelector((state) => state.jokesReducer);

  const loadJokesFromStorage = useCallback(async () => {
    const savedJokes = await AsyncStorage.getItem('jokesData');
    if (savedJokes) {
      const jokesData = JSON.parse(savedJokes);
      dispatch(jokesActions.setJokesHistory(jokesData));
    }
  }, [dispatch]);

  const likeJoke = (joke: IJoke) => () => {
    dispatch(jokesActions.likeJoke(joke));
  };

  const undoLikeJoke = (joke: IJoke) => () => {
    dispatch(jokesActions.undoLikeJoke(joke));
  };

  useEffect(() => {
    loadJokesFromStorage();
  }, [loadJokesFromStorage]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <FlatList
        data={jokesHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.jokeContainer}>
            <View style={styles.jokeContent}>
              {item.type === EJokeType.SINGLE ? (
                <View>
                  <Text style={styles.jokeText}>{item.joke}</Text>
                  <View style={styles.categoryContainer}>
                    <Text style={[styles.category]}>Category: </Text>
                    <Text style={[styles.category]}>{item.category}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.jokeText}>{item.setup}</Text>
                  <Text style={styles.jokeText}>{item.delivery}</Text>
                  <View style={styles.categoryContainer}>
                    <Text style={[styles.category]}>Category: </Text>
                    <Text style={[styles.category]}>{item.category}</Text>
                  </View>
                </View>
              )}
            </View>

            <Pressable
              onPress={item.liked ? undoLikeJoke(item) : likeJoke(item)}
              style={[styles.likeButton, {backgroundColor: item.liked ? '#9763FF' : '#EAE0FF'}]}>
              {item.liked ? <FavFilledIcon /> : <FavIcon />}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    marginTop: 60,
    paddingLeft: 20,
    paddingBottom: 16,
    fontSize: 36,
    lineHeight: 48,
    fontWeight: 700,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  likeButton: {
    borderRadius: 50,
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jokeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  jokeContent: {
    flex: 1,
  },
  jokeText: {fontSize: 20, lineHeight: 24, fontWeight: 500, color: '#000', marginBottom: 8},
  category: {fontSize: 16, lineHeight: 20, fontWeight: 400, color: '#323232'},
  categoryContainer: {display: 'flex', flexDirection: 'row'},
});
