import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://loyal-marginally-turtle.ngrok-free.app/api/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0'
  },
  timeout: 3000,
  withCredentials: true
})
