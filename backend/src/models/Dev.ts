import { Schema, model } from 'mongoose';
import LocationSchema from './utils/LocationSchema';

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

const DevSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: LocationSchema,
    index: '2dsphere'
  }
});

export default model('Dev', DevSchema);
