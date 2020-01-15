import { Schema, model } from 'mongoose';
import LocationSchema from './utils/LocationSchema';

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
