import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache' // *INFO: Keep this! Else you will get disk-cache errors in certain scenarios
  },
  timeout: 3000,
  withCredentials: true
})
