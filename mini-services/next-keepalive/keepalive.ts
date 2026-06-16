// Simple keepalive service that pings Next.js dev server every 2 seconds
import http from "http";

const TARGET = "http://localhost:3000/";

function ping() {
  http.get(TARGET, (res) => {
    res.resume();
  }).on("error", () => {
    // Server might be down, try to start it
  });
}

// Ping every 2 seconds
setInterval(ping, 2000);
ping();

// Also serve a health endpoint on port 3001
const server = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end("keepalive running");
});
server.listen(3001, () => {
  console.log("Keepalive service running on port 3001");
});
