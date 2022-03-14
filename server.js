const IPFS = require('ipfs-core')
const express = require("express")

  
async function main(){
    const app = express()

    app.get('/', (req, res) => {
        res.send(__dirname + "/index.html")
    })
    app.listen(80, async () => {
        console.log(`Example app listening on port 80`)
        const node = await IPFS.create({
            EXPERIMENTAL: {
                pubsub: true
            },
            config:{
                Addresses:{
                Swarm: [
                    '/ip4/0.0.0.0/tcp/4012/ws'                  
                ],
              }
            },
            relay: {
                enabled: true,
                hop: {
                    enabled: true
                }
            }
        })
        const id = await node.id()
        console.log(id)

        node.pubsub.subscribe('com.lob.www:dtwitter-poc', function(mes){
            console.log(mes)
        })
    })
    
}

main()
