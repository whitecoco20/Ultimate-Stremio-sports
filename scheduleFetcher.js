const axios = require("axios")
const fs = require("fs")

async function fetchGames(){

 const leagues=[
  "basketball/nba",
  "football/nfl",
  "baseball/mlb",
  "hockey/nhl"
 ]

 let games=[]

 for(const league of leagues){

  const url=`https://site.api.espn.com/apis/site/v2/sports/${league}/scoreboard`

  const res=await axios.get(url)

  res.data.events.forEach(event=>{

   const home=event.competitions[0].competitors[0].team.displayName
   const away=event.competitions[0].competitors[1].team.displayName

   games.push({
    id:"game_"+home.replace(/\s/g,"")+"_"+away.replace(/\s/g,""),
    title:`${home} vs ${away}`,
    league:league
   })

  })

 }

 fs.writeFileSync("cacheGames.json",JSON.stringify(games,null,2))
}

module.exports=fetchGames
