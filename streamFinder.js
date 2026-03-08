const axios=require("axios")
const fs=require("fs")

async function findStreams(game){

 const playlist="https://iptv-org.github.io/iptv/categories/sports.m3u"

 const res=await axios.get(playlist)

 const lines=res.data.split("\n")

 let streams=[]

 lines.forEach(l=>{

  if(l.includes("http")){
   streams.push({
    title:"Sports Stream",
    url:l.trim()
   })
  }

 })

 return streams.slice(0,20)

}

module.exports=findStreams
