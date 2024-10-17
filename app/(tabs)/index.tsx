import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jokesActions} from '@/store/reducers/JokesSlice';
import JokesApi from '@/services/JokesApi';
import {FavIcon} from '@/assets/icons/Fav';
import {FavFilledIcon} from '@/assets/icons/FavFilled';
import {EJokeType} from '@/enums/EJokeType';
import {isToday, parseISO} from 'date-fns';

export default function TodayJoke() {
  const dispatch = useAppDispatch();
  const {todayJoke} = useAppSelector((state) => state.jokesReducer);

  const getJoke = () => {
    dispatch(JokesApi.getTodayJoke());
  };

  const loadJokesFromStorage = useCallback(async () => {
    const savedJokes = await AsyncStorage.getItem('jokesData');
    if (savedJokes) {
      const jokesData = JSON.parse(savedJokes);
      const todayJokeCreatedAt = jokesData.todayJoke?.createdAt;
      if (todayJokeCreatedAt && isToday(parseISO(todayJokeCreatedAt))) {
        dispatch(jokesActions.setJokesHistory(jokesData));
      } else {
        getJoke();
      }
    } else {
      getJoke();
    }
  }, [dispatch]);

  const likeJoke = () => {
    dispatch(jokesActions.likeJoke(todayJoke));
  };
  const undoLikeJoke = () => {
    dispatch(jokesActions.undoLikeJoke(todayJoke));
  };

  useEffect(() => {
    loadJokesFromStorage();
  }, [loadJokesFromStorage]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today</Text>
      {todayJoke ? (
        <View style={styles.jokeContainer}>
          {todayJoke.type === EJokeType.SINGLE ? (
            <Text style={styles.jokeText}>{todayJoke.joke}</Text>
          ) : (
            <View>
              <Text style={styles.jokeText}>{todayJoke?.setup}</Text>
              <Text style={styles.jokeText}>{todayJoke?.delivery}</Text>
            </View>
          )}
          <Pressable
            onPress={todayJoke.liked ? undoLikeJoke : likeJoke}
            style={[styles.likeButton, {backgroundColor: todayJoke.liked ? '#9763FF' : '#EAE0FF'}]}>
            {todayJoke.liked ? <FavFilledIcon /> : <FavIcon />}
          </Pressable>

          <Pressable onPress={getJoke} style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Get a new joke</Text>
          </Pressable>
        </View>
      ) : (
        <Text>No joke loaded...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  jokeContainer: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
  likeButton: {
    marginTop: 10,
    borderRadius: 50,
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    marginTop: 50,
    borderRadius: 8,
    width: 300,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  refreshButtonText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 500,
    backgroundColor: '#fff',
  },
  header: {
    color: '#000',
    fontSize: 36,
    lineHeight: 48,
    fontWeight: 700,
    marginTop: 60,
    paddingLeft: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  jokeText: {fontSize: 24, lineHeight: 28, fontWeight: 500, color: '#000', marginBottom: 8},
});
