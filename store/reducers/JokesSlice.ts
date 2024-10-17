import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

import JokesApi from '@/services/JokesApi';
import {IJoke} from '@/interfaces/IJoke';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatISO} from 'date-fns';

export interface IJokesState {
  todayJoke: IJoke | null;
  jokesHistory: IJoke[];
  loading: boolean;
}

export const initialState: IJokesState = {
  todayJoke: null,
  jokesHistory: [],
  loading: false,
};

export const jokesSlice = createSlice({
  name: 'jokes-slice',
  initialState,
  reducers: {
    likeJoke: (state, {payload}: PayloadAction<IJoke>) => {
      const likedJokeIdx = state.jokesHistory.findIndex((joke) => joke.id === payload.id);
      state.jokesHistory.splice(likedJokeIdx, 1, {...payload, liked: true});
      if (payload.id === state?.todayJoke?.id) {
        state.todayJoke = {...payload, liked: true};
      }
      saveToAsyncStorage(state);
    },
    undoLikeJoke: (state, {payload}: PayloadAction<IJoke>) => {
      const unLikedJokeIdx = state.jokesHistory.findIndex((joke) => joke.id === payload.id);
      state.jokesHistory.splice(unLikedJokeIdx, 1, {...payload, liked: false});
      if (payload.id === state?.todayJoke?.id) {
        state.todayJoke = {...payload, liked: false};
      }
      saveToAsyncStorage(state);
    },
    setJokesHistory: (state, action) => {
      state.jokesHistory = action.payload.jokesHistory;
      state.todayJoke = action.payload.todayJoke;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(JokesApi.getTodayJoke.pending.type, (state) => {
      state.loading = true;
    });
    builder.addCase(JokesApi.getTodayJoke.fulfilled.type, (state, {payload}: PayloadAction<IJoke>) => {
      const joke = {...payload, liked: false, createdAt: formatISO(new Date())};
      state.loading = false;
      state.todayJoke = joke;
      state.jokesHistory.unshift(joke);
      saveToAsyncStorage(state);
    });
    builder.addCase(JokesApi.getTodayJoke.rejected.type, (state) => {
      state.loading = false;
    });
  },
});
export const jokesActions = jokesSlice.actions;

export default jokesSlice.reducer;

const saveToAsyncStorage = async (state: IJokesState) => {
  await AsyncStorage.setItem('jokesData', JSON.stringify(state));
};
