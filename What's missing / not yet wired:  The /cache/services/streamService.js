const cache = require("../cache/cache");

const { getIPTVStreams } = require("../sources/iptv-org");
const { getTVGardenStreams } = require("../sources/tvgarden");
const { getM3UStreams } = require("../sources/m3u-aggregator");
const { getGlobalStreams } = require("../sources/global-iptv");
const { getEventStreams } = require("../sources/event-streams");

async function fetchStreams() {

const cached = cache.get("sports_streams");

if (cached) return cached;

const iptv = await getIPTVStreams();
const tvgarden = await getTVGardenStreams();
const m3u = await getM3UStreams();
const global = await getGlobalStreams();
const events = await getEventStreams();

const streams = [
...iptv,
...tvgarden,
...m3u,
...global,
...events
];

cache.set("sports_streams", streams);

return streams;

}

module.exports = { fetchStreams };
