const { fetch } = require("../utils/http");

async function getIPTVStreams() {

const playlist =
"https://iptv-org.github.io/iptv/categories/sports.m3u";

const data = await fetch(playlist);

const lines = data.split("\n");

let streams = [];

for (let line of lines) {

```
if (line.startsWith("http")) {

  streams.push({
    title: "IPTV Sports",
    url: line
  });

}
```

}

return streams;

}

module.exports = { getIPTVStreams };
