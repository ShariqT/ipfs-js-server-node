const IPFS = require('ipfs-core')

async function main(){

    const node = await IPFS.create({
        EXPERIMENTAL: {
            pubsub: true
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
}

main()
