/* eslint-disable no-console */
import { Socket } from 'socket.io'

const socketInit = (socket: Socket) => {
  console.log(socket.id)

  socket.conn.once('upgrade', () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    console.log('upgraded transport', socket.conn.transport.name) // prints "websocket"
  })

  socket.on('disconnect', (reason) => {
    console.log(`Reason for disconnecting: ${reason}`)
  })

  socket.on('set_username', (username: string) => {
    socket.data.username = username
  })

  socket.on('join_room', (room_id: string) => {
    socket.join(room_id)
    socket.data.room_id = room_id
    socket
      .to(socket.data.room_id)
      .emit(
        'msg',
        `${socket.data.username || 'unnamed person'} joined the room`
      )
  })

  socket.on('leave_room', (room_id: string) => {
    socket.leave(room_id)
    socket.data.room_id = null
  })

  socket.on('msg', (msg: string) => {
    socket.to(socket.data.room_id).emit('msg', msg)
  })
}

export default socketInit
