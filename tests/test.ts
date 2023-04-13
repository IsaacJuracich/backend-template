import client from "socket.io-client";

describe("Socket", () => {
  const socket = client("http://localhost:3035", {
    transports: ["websocket"],
    upgrade: false,
  });

  it("Connect to Socket", (done) => {
    socket.on("connect", () => {
      console.log("Socket connected");
      done();
    });
  });

  it("Disconnect from Socket", (done) => {
    socket.disconnect();

    done();
  });
});
