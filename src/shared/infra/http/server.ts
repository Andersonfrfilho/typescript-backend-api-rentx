
import { app } from "@shared/infra/http/app"
import { Server as ServerSocket } from "socket.io"
import { Server as ServerHttp } from "http"
import { request } from "express";

app.set("port", process.env.PORT || 3333);

let http = new ServerHttp(app);

const io = new ServerSocket(http);
const connected_users:Record<string,string> = {};
io.on("connection", (socket: any) => {
  const {user_id} = socket.handshake.query;
  connected_users[user_id] = socket.id
  socket.on("disconnect", () =>{
    delete connected_users[user_id]
  })
  io.to(connected_users[user_id]).emit("notification","uhulll")
  request.io = io
  request.connected_users = connected_users
  console.log("a user connected");
});

http.listen(process.env.PORT || 3333, function() {
  console.log(`listening on *:${process.env.PORT || 3333}`);
});