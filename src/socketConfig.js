import openSocket from 'socket.io-client';

const socket = openSocket("ws://localhost:8900");

export default socket;