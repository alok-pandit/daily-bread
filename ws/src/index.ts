/* eslint-disable no-console */
import { createAdapter } from '@socket.io/redis-streams-adapter'
import { Redis } from 'ioredis'
import { Server } from 'socket.io'
import { App } from 'uWebSockets.js'

import socketInit from './socket'

const app = App()
const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  db: 9
})

// TODO: Check why socket.io-cbor-x-parser is not working
const io = new Server({
  adapter: createAdapter(redisClient)
})

io.attachApp(app)

app.listen(Number(process.env.WS_SERVER_PORT), (token) => {
  if (!token) {
    console.warn('port already in use')
  } else {
    console.log(
      token,
      `WS Server running on ${Number(process.env.WS_SERVER_PORT)}`
    )
  }
})

// *INFO: Socket Init has to be the last line after all server initialization has been done.
io.on('connection', socketInit)
