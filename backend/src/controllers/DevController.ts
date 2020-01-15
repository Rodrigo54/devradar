import axios from 'axios';
import DevSchema from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';
import { Request, Response } from 'express';

export async function index(request: Request, response: Response) {
  const devs = await DevSchema.find();
  return response.json(devs);
};

export async function store(request: Request, response: Response) {
  const { github_username, techs, latitude, longitude } = request.body;

  let dev = await DevSchema.findOne({ github_username });

  if (!dev) {
    const api_res = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = github_username, avatar_url, bio } = api_res.data;
    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    dev = await DevSchema.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
  }

  return response.json(dev);
}
