const cron = require("node-cron");
const { fetchStreams } = require("./services/streamService");

cron.schedule("*/5 * * * *", async () => {
try {
await fetchStreams();
console.log("Streams refreshed");
} catch (err) {
console.log("Refresh failed");
}
});
