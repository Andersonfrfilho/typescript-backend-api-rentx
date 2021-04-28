
import * as path from "path";
import cors from "cors";
import { app } from "@shared/infra/http/app"
import { Server } from "socket.io"
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
const io = new Server(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
});

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});