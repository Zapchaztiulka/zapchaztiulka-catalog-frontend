import { io } from 'socket.io-client';

const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.BACKEND_DEV_URL
    : process.env.BACKEND_PROD_URL;

export const socket = io.connect(BACKEND_URL);
