import mqtt from "mqtt";

let level = 10;
let status = "rising";

let client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", function () {
  // Check MQTT server connection
  console.log("Device configured to publish : " + client.connected);

  if (client.connected == true) {
    //  Publish mqtt data after 1.5s
    setInterval(() => {
      client.publish("level", level.toString(), console.log);

      console.log(level, status);

      if (status === "rising") {
        level = level + 10;
        console.log(`New level : ${level}`);
      }

      if (level == 90) {
        console.log(`Changing status to falling`);
        status = "falling";
      }

      if (status === "falling") {
        level = level - 10;
        console.log(`New level : ${level}`);
      }

      if (level == 20) {
        console.log(`Changing status to rising`);
        status = "rising";
      }
    }, 5000);
  }
});
