import {io} from 'socket.io-client';

const SOCKET_URL = 'https://task.eltutor.in/';

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      console.log('initializing.. socket', this.socket);

      this.socket.on('connect', data => {
        console.log('=== socket connectd ===');
      });

      this.socket.on('disconnect', data => {
        console.log('=== socket disconnected ===');
      });

      this.socket.on('error', data => {
        console.log('socket error',error);
      });
    } catch (error) {
      console.log('soket is not inialzed', error);
    }
  };

  emit(event,data={}){
    this.socket.emit(event,data)
  }
  on(event,cb){
    this.socket.on(event,cb)
  }
  removeListener(listenerName){
    this.socket.removeListener(listenerName)
  }
}

const socketServcies=new WSService()

export default socketServcies