const ffmpeg = require("fluent-ffmpeg")
const faststart = require('node-faststart')
const CosmosClient = require('@azure/cosmos').CosmosClient

const ffmpegPath = "D:/home/site/wwwroot/ffmpeg-4.1-win64-static/bin/ffmpeg.exe"
const ffprobePath = "D:/home/site/wwwroot/ffmpeg-4.1-win64-static/bin/ffprobe.exe"
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

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

function videoItemRead(videoId){
    return client.database(databaseId).container(containerId).item(videoId).read()
}

function videoItemReplace(videoId, videoItem){
    return client.database(databaseId).container(containerId).item(videoId).replace(videoItem)
}

module.exports = function (context, videoBlob) {
    context.log(`---start process video ---`)
    context.log(`video name: ${context.bindingData.name}\nfile size:${videoBlob.length} Bytes`)

    let videoName = context.bindingData.name
    let dashIndex = videoName.lastIndexOf("-")
    let videoId = videoName.slice(0, dashIndex)
    
    videoItemRead(videoId)
        .then(r=>{
            let videoItem = r.body
            context.log(videoItem)
            if(videoItem.status === "uploading"){
                let videoStream = faststart.convert(videoBlob, true)
                ffmpeg.ffprobe(videoStream, (err, metadata)=>{
                    if(err){
                        context.log(err)
                        videoItem.status = "error"
                    }else{
                        context.log(metadata)
                        videoItem.status = "ok"
                        videoItem.duration = metadata.format.duration
                        videoItem.watchedTime = -1
                        videoItem.favorite = false
                        videoItem.path = `/videos/${videoItem.storeName}`
                    }
                    videoItemReplace(videoId, videoItem)
                            .then(r=>{
                                context.log(r)
                                if(faststart.isFaststart(videoBlob)){
                                    context.log("video is streamable")
                                }else{
                                    context.log("video is not streamable")
                                }
                                context.bindings.streamableVideo = faststart.convert(videoBlob)
                                context.done()
                            })
                            .catch(err=>{
                                context.log(err)
                                context.done()
                            })
                })
            }
        })
        .catch(err=>{
            context.log(err)
            context.done()
        })
};