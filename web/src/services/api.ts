import axios from 'axios';


export interface Dev {
  _id: any;
  name: string,
  github_username: string,
  bio: string,
  avatar_url: string,
  techs: string[],
  location: {
    coordinates: [number, number]
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api;
