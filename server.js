const ws = new require("ws");
// const fs = new require("fs");
// const http = new require("http");

// const index = fs.readFileSync('./index.html', 'utf-8');

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end(index);
// })

let clients = {};
let id = 1;

function startConnect() {
  const wsPort = new ws.Server({ port: 8080 });

  wsPort.on("connection", function (wsConnect) {
    wsConnect.on("open", () => {
      console.log("Соединение установлено");
    });

    wsConnect.on("message", function (message) {
      const messString = message.toString();

      wsPort.clients.forEach((client) => {
        if (!client.id) {
          client.id = id;
          client.name = `Client${id}`;
          console.log(`В чате ${client.name}`);
          ++id;
        }
        console.log(`Client${client.id}: ${messString}`);
        if (client.readyState === ws.OPEN) {
          client.send(messString);
        }
      });
      wsConnect.on("error", () => {
        console.log("Ошибка доступа");
      });
      wsConnect.on("close", function () {
        console.log("Соединение закрыто");
        clients = {};
      });
    });
  });
  console.log("Server start");
}

startConnect();
