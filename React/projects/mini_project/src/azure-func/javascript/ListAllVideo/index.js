const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = "https://domain:443/"
const masterKey = "1BuRmwSH2BzuLonOtlwkUPpRmvePML66S1xOn6EuKaZKE0E5xAGQmxmW0yNAEDBacuDIt0BBU9e09KJ0GfWPig=="

const databaseId = "minidb"
const containerId = "videos"

const client = new CosmosClient({
    endpoint: endpoint,
    auth: {
        masterKey: masterKey
    }
})

module.exports = function (context, req) {
    let userId = req.body.userId
    if(userId){
        let querySpec = {
            query: "SELECT * FROM videos WHERE videos.userId = @userId",
            parameters: [
                {
                    name: "@userId",
                    value: userId
                }
            ]
        }
        client.database(databaseId).container(containerId).items
            .query(querySpec)
            .toArray()
            .then(r=>{
                let videoInfoList = r.result
                let data = videoInfoList.map(rawInfo=>{
                    let videoInfo = {}
                    videoInfo.id = rawInfo.id
                    let dotIndex = rawInfo.rawFileName.lastIndexOf(".")
                    videoInfo.title = rawInfo.rawFileName.slice(0,dotIndex)
                    videoInfo.uploadDate = rawInfo.uploadDate
                    videoInfo.status = rawInfo.status
                    videoInfo.path = rawInfo.path
                    videoInfo.previewPath = rawInfo.previewPath
                    videoInfo.duration = rawInfo.duration
                    videoInfo.watchedTime = rawInfo.watchedTime
                    videoInfo.favorite = rawInfo.favorite
                    return videoInfo
                })
                context.res = {
                    status: "ok",
                    data: data
                }
                context.done()
            })
            .catch(err=>{
                context.res = {
                    status: "error",
                    data: "meets some error"
                }
                context.log(err)
                context.done()
            })
    }else{
        context.res = {
            status: "invalid_id",
            data:"please pass a valid id"
        }
        context.done()
    }
};