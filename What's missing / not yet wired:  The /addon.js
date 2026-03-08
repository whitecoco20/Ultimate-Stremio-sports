const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

require("./scheduler");

const manifest = require("./manifest.json");
const { fetchStreams } = require("./services/streamService");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async () => {
const streams = await fetchStreams();

return {
streams: streams.map(s => ({
title: s.title,
url: s.url
}))
};
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });
