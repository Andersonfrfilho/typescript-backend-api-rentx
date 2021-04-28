
import { app } from "@shared/infra/http/app"
import { Server as ServerSocket } from "socket.io"
import { Server as ServerHttp } from "http"

app.set("port", process.env.PORT || 3333);

let http = new ServerHttp(app);

const io = new ServerSocket(http);

io.on("connection", function(socket: any) {
  console.log("a user connected");
});

http.listen(process.env.PORT || 3333, function() {
  console.log(`listening on *:${process.env.PORT || 3333}`);
});