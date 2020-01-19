import * as socketio from 'socket.io';
import { Server } from 'http';
import parseStringAsArray from './utils/parseStringAsArray';
import { getDistanceFromLatLonInKm } from './utils/calcDistance';

type coordinates = {
  latitude: number,
  longitude: number,
}

type connection = {
  id: string;
  coordinates: coordinates;
  techs: string[];
}

const connections: connection[] = [];

let io: socketio.Server;


export function setupWebsocket(server: Server) {
  io = socketio(server);

  io.on('connection', (socket) => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)
    });
  });

}

export function findConnections(coordinates: coordinates, techs: string[]) {
  return connections.filter(connection => {
    return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
}

export function sedMessage(to: connection[], message: string, data: any) {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}
