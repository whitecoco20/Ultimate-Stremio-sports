const cheerio = require("cheerio");
const { fetch } = require("../utils/http");

async function getTVGardenStreams() {

const html = await fetch(
"https://watchhub.work/tvgarden/"
);

const $ = cheerio.load(html);

const streams = [];

$("a").each((i, el) => {

```
const link = $(el).attr("href");

if (link && link.includes("m3u8")) {

  streams.push({
    title: "TV Garden",
    url: link
  });

}
```

});

return streams;

}

module.exports = { getTVGardenStreams };
