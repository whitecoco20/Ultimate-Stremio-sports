const { addonBuilder, serveHTTP } = require("stremio-addon-sdk")
const cron=require("node-cron")

const fetchGames=require("./scheduleFetcher")
const getCatalog=require("./catalogBuilder")
const findStreams=require("./streamFinder")

const manifest=require("./manifest.json")

const builder=new addonBuilder(manifest)

cron.schedule("*/10 * * * *",async()=>{
 await fetchGames()
})

builder.defineCatalogHandler(args=>{
 return Promise.resolve(getCatalog())
})

builder.defineStreamHandler(async args=>{

 const streams=await findStreams(args.id)

 return {streams}

})

serveHTTP(builder.getInterface(),{port:process.env.PORT||7000})
