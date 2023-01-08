import axios from 'axios';

export const ApiMovie = axios.create({
  baseURL: 'https://streaming-api.vercel.app/',
});
