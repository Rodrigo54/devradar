import axios from 'axios';

<<<<<<< HEAD

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

=======
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api;
