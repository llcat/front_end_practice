const ffmpeg = require("fluent-ffmpeg")
const Jimp = require("jimp");
const toReadableStream = require('to-readable-stream');
const readAllStream = require('read-all-stream')
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

    let videoName = context.bindingData.name
    let dashIndex = videoName.lastIndexOf("-")
    let videoId = videoName.slice(0, dashIndex)
    videoItemRead(videoId)
        .then(r=>{
            let videoItem = r.body

            if(videoItem.status === "uploading"){
                let inputStream = faststart.convert(videoBlob, true)
                ffmpeg.ffprobe(inputStream, (err, metadata)=>{
                    if(err){
                        context.log(err)
                        videoItem.status = "error"
                        videoItemReplace(videoId, videoItem)
                            .then(r=>{
                                context.log(r)
                                context.done()
                            })
                            .catch(err=>{
                                context.log(err)
                                throw err
                            })
                    }else{
                        context.log(metadata)
                        videoItem.status = "ok"
                        videoItem.duration = metadata.format.duration
                        videoItem.watchedProgress = 0
                        videoItem.watched = false
                        videoItem.favorite = false

                        let videoStream  = faststart.convert(videoBlob, true)
                        let ff = ffmpeg(videoStream)
                            .noAudio()
                            .seek(0)
                            .format("image2")
                            .on("error", (error)=>{
                                context.log(error)
                                throw error
                            })
                            .on("end", ()=>{
                                context.log("--- ffmpeg process end ---")
                            })
                        
                        let ffStream = ff.pipe()
                        context.log("--- start generate ---")
                        ffStream.on("data",(chunk)=>{
                            context.log(`chunk length:${chunk.length}`)
                            Jimp.read(chunk)
                                .then(img=>{
                                    context.log(img.getMIME())
                                    img.resize(480, Jimp.AUTO)
                                       .quality(80)
                                       .getBuffer(Jimp.MIME_PNG, (err, data)=>{
                                           if(err){
                                                context.log(err)
                                                throw err
                                           }else{
                                                context.bindings.videoPreview = data
                                                context.done()
                                           }
                                       })
                                })
                        })

                        // readAllStream(ffStream, {})
                        //     .then(buffer=>{
                        //         context.log(`buffer length:${buffer.length}`)
                        //         Jimp.read(buffer)
                        //             .then(img=>{
                        //                 context.log(img.getMIME())
                        //                 img.resize(480, Jimp.AUTO)
                        //                    .quality(80)
                        //                    .getBuffer(Jimp.MIME_PNG, (err, data)=>{
                        //                        if(err){
                        //                            context.log(err)
                        //                            throw err
                        //                        }else{
                        //                            context.bindings.videoPreview = data
                        //                            context.done()
                        //                        }
                        //                    })
                        //             })
                        //             .catch(err=>{
                        //                 context.log(err)
                        //                 throw err
                        //             })
                        //     })
                        //     .catch(err=>{
                        //         context.log(err)
                        //         throw err
                        //     })
            
                        if(faststart.isFaststart(videoBlob)){
                            context.log("video is streamable")
                        }else{
                             context.log("video is not streamable")
                             context.bindings.streamableVideo = faststart.convert(videoBlob)
                        }
                    }
                })
            }

        })
        .catch(err=>{
            context.log(err)
            context.done()
        })
};