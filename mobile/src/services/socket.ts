import socketio from 'socket.io-client';

const socket = socketio('http://192.168.2.3:3333', {
  autoConnect: false
});

export function connect(query: { latitude: number, longitude: number, techs: string }) {
  socket.io.opts.query = query;
  socket.connect();

  socket.on('message', (message: string) => {
    console.log(message);
  });
}

export function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}


export function subscribeNewDevs(subscribe: (_:any) => void) {
  socket.on('new-dev', subscribe);
}
