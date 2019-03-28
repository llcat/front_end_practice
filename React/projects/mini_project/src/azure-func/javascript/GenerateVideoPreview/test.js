const ffmpeg = require("fluent-ffmpeg")
const Jimp = require("jimp");

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
    context.log(`---start generate preview ---`)
    context.log(`video name: ${context.bindingData.name}\nfile size:${videoBlob.length} Bytes`)
    let videoStream = faststart.convert(videoBlob, true)

    let videoName = context.bindingData.name
    let dashIndex = videoName.lastIndexOf("-")
    let videoId = videoName.slice(0, dashIndex)

    let ff = ffmpeg(videoStream)
                .noAudio()
                .seek(0)
                .format("image2")
                .on("start",(cmd)=>{
                    context.log(`cmd:${cmd}`)
                })
                .on("end",()=>{
                    context.log(" process end")
                })
                .on("error", (err)=>{
                    context.log(err)
                })

    let ffStream = ff.pipe()

    ffStream.on("data", (chunk)=>{
        context.log(`chunk length:${chunk.length}`)
        Jimp.read(chunk)
                .then(img=>{
                    context.log(img.getMIME())
                    img.resize(480, Jimp.AUTO)
                        .quality(80)
                        .getBuffer(Jimp.MIME_PNG, (err, data)=>{
                            let previewPath = ""
                            if(err){
                                previewPath = "/videos-preview/default.png"
                                context.log(err)
                            }else{
                                context.bindings.videoPreview = data
                                previewPath = `/videos-preview/${videoName}.png`
                            }
                            videoItemRead(videoId)
                                .then(r=>{
                                    let videoItem = r.body
                                    videoItem.previewPath = previewPath
                                    videoItemReplace(videoId, videoItem)
                                        .then(r=>{
                                            context.log(r)
                                            context.done()
                                        })
                                        .catch(err=>{
                                            context.log(err)
                                            context.done()
                                        })
                                })
                                .catch(err=>{
                                    context.log(err)
                                    context.done()
                                })
                        })
                })
    })
};