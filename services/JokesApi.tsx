import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

class JokesApi {
  static getTodayJoke = createAsyncThunk('get-today-joke', async () => {
    const response = await axios.get('https://v2.jokeapi.dev/joke/any');
    return response.data;
  });
}
export default JokesApi;
