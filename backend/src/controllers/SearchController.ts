import DevSchema from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';
import { Request, Response } from 'express';

export async function index(request: Request, response: Response) {
  console.log(request.query);
  const { techs, latitude, longitude } = request.query;

  const techsArray = parseStringAsArray(techs);
  const devs = await DevSchema.find({
    techs: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    }
  });
  return response.json(devs);
};
