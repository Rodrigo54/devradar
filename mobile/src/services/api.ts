import axios from 'axios';

export interface Dev {
  _id: string;
  name: string,
  github_username: string,
  bio: string,
  avatar_url: string,
  techs: string[],
  location: {
    coordinates: [number, number] // [longitude, latitude]
    type: string;
    _id: string;
  }
}

const api = axios.create({
  baseURL: 'http://192.168.2.3:3333'
})

export default api;
