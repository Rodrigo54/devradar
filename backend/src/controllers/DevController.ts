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

export async function update(request: Request, response: Response) {
  const { github_username } = request.params;

  let dev: any = await DevSchema.findOne({ github_username });

  if (!dev) {
    return response.status(400).json({ message: "Usuário não encontrado!" });
  }

  const {
    name = dev.name,
    bio = dev.bio,
    longitude = dev.location.coordinates[0],
    latitude = dev.location.coordinates[1],
    avatar_url = dev.avatar_url
  } = request.body;

  const techs = request.body.techs ? parseStringAsArray(request.body.techs) : dev.techs;

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  let updatedDev = await DevSchema.findOneAndUpdate({ github_username }, { name, techs, bio, avatar_url, location }, { new: true });

  return response.json(updatedDev);
}

export async function destroy(request: Request, response: Response) {
  const { github_username } = request.params;
  let dev = await DevSchema.findOne({ github_username });

  if (!dev) {
    return response.status(400).json({ message: "Usuário não encontrado!" });
  }

  await DevSchema.findOneAndDelete({ github_username });
  return response.json({ deleted: true });
}
