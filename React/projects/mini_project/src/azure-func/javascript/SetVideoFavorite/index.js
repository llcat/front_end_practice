const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = "https://domain:443/"
const masterKey = "1BuRmwSH2BzuLonOtlwkUPpRmvePML66S1xOn6EuKaZKE0E5xAGQmxmW0yNAEDBacuDIt0BBU9e09KJ0GfWPig=="

const databaseId = "minidb"
const containerId = "videos"

const STATUS = {
    NOTFOUND: 404
}

const client = new CosmosClient({
    endpoint: endpoint,
    auth: {
        masterKey: masterKey
    }
})

function videoItemRead(videoId){
    return client.database(databaseId).container(containerId).item(videoId).read()
}

function videoItemReplace(videoId, videoItem){
    return client.database(databaseId).container(containerId).item(videoId).replace(videoItem)
}

module.exports = function (context, req) {
    let videoId = req.body.videoId
    let favorite = req.body.favorite
    if(videoId && favorite!==undefined){
        videoItemRead(videoId)
            .then(r=>{
                let videoItem = r.body
                videoItem.favorite = favorite
                videoItemReplace(videoId,videoItem)
                    .then(r=>{
                        context.res = {
                            status: "success",
                            info: "set video as your favorite success"
                        }
                        context.done()
                    })
                    .catch(err=>{
                        context.log(err)
                        context.done()
                    })
            })
            .catch(err=>{
                context.log("err------")
                context.log(err)
                if(err.code === STATUS.NOTFOUND){
                    context.res = {
                        status: "invalid_id",
                        info: "video id is not exist"
                    }
                }
                context.done()
            })
    }else{
        context.res = {
            status: "invalid_request",
            info: "please pass a valid request params"
        }
        context.done()
    }
};