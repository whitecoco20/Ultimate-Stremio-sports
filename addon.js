const { addonBuilder, serveHTTP } = require("stremio-addon-sdk")
const express = require("express")
const fs = require("fs")

const manifest = require("./manifest.json")
const streamsData = require("./streams.json")

const builder = new addonBuilder(manifest)

builder.defineStreamHandler((args) => {
    const match = streamsData.find(s => s.id === args.id)

    if (!match) {
        return Promise.resolve({ streams: [] })
    }

    return Promise.resolve({
        streams: match.streams
    })
})

const addonInterface = builder.getInterface()

const app = express()

serveHTTP(addonInterface, { port: 7000 })

app.get("/", (req, res) => {
    res.send("WLH Sports Addon Running")
})

app.listen(7000)
