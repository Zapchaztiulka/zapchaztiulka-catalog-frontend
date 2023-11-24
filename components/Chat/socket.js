import { io } from 'socket.io-client';

const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
    : process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export const socket = io.connect(BACKEND_URL);
