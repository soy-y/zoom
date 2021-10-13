import http from "http";
// import Websocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
//catchall url
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//app.listen(3000, handleListen);

const httpServer = http.createServer(app);
//이렇게 작성하면 http서버, websocket서버 둘 다 돌릴 수 있음.
//2개의 protocol, 다 같은 port를 공유하는 것
// const wss = new Websocket.Server( {server} );
const wsServer = SocketIO(httpServer);

// fake database. 다른 브라우저들과도 연결해주기 위함
// const sockets = [];
// //여기서 socket은 연결된 브라우저
// wss.on("connection", (socket) =>{
//     sockets.push(socket);
//     socket["nickname"] = "Anon"
//     console.log("Connected to Browser ✔");
//     socket.on("close", () => console.log("Disconnected to Browser ❌"));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch(message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                 break;
//             case "nickname":
//                 console.log("nick:",message.payload);
//                 socket["nickname"] = message.payload;
//                 break;
//         }
//     });
// });

httpServer.listen(3000, handleListen);