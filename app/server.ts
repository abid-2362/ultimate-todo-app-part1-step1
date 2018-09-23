import app from "./app";
import serverConfig from "./serverConfig";

const server = app.listen(serverConfig.port, () => {
  console.log("server is running at " + serverConfig.port);
});

module.exports = server;