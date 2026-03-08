const fs=require("fs")

function getCatalog(){

 const games=JSON.parse(fs.readFileSync("cacheGames.json"))

 return {
  metas:games.map(g=>({
   id:g.id,
   type:"channel",
   name:g.title
  }))
 }

}

module.exports=getCatalog
