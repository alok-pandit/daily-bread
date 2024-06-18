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

// INFO: Do not pass a custom parser. That causes problems.
const io = new Server({
  adapter: createAdapter(redisClient),
  cors: {
    origin: '*'
  }
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

// INFO: This has to be the last line after all initialization has been done.
io.on('connection', socketInit)
