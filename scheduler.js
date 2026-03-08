const cron = require("node-cron")
const axios = require("axios")
const fs = require("fs")

cron.schedule("*/30 * * * *", async () => {

    try {

        const response = await axios.get("https://example-stream-source.com/api")

        fs.writeFileSync("streams.json", JSON.stringify(response.data, null, 2))

        console.log("Streams updated")

    } catch (err) {

        console.log("Update failed")

    }

})
