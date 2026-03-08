const { addonBuilder, serveHTTP } = require("stremio-addon-sdk")
const fs = require("fs")
require("./scheduler")

const manifest = require("./manifest.json")

const builder = new addonBuilder(manifest)

builder.defineStreamHandler(args => {

 let streams = []

 try {

  const data = JSON.parse(
   fs.readFileSync("streamsCache.json")
  )

  const filtered = data.filter(c => c.id === args.id)

  streams = filtered.map(c => ({
   title: c.title,
   url: c.url
  }))

 } catch (err) {

  streams = []

 }

 return Promise.resolve({ streams })

})

const addonInterface = builder.getInterface()

serveHTTP(addonInterface, { port: process.env.PORT || 7000 })
