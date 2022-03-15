const IPFS = require('ipfs-core')
const express = require("express")

  
async function main(){
    const app = express()
    const node = await IPFS.create({
        EXPERIMENTAL: {
            pubsub: true
        },
        config:{
            Addresses:{
            Swarm: [
                '/ip4/0.0.0.0/tcp/4013',
                '/ip4/0.0.0.0/tcp/4012/wss'                  
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
    

    node.pubsub.subscribe('com.lob.www:dtwitter-poc', function(mes){
        console.log(mes)
    })
    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/index.html")
    })
    app.get('/addr', async (req, res) => {
        const id = await node.id()
        console.log(id)
        res.send('/dns4/projects.enshapa-engineering.com/tcp/4013/ws/p2p/' + id)
    })
    app.listen(45550, () => {
        console.log(`Example app listening on port ${45550}`)
    })
    
}

main()
