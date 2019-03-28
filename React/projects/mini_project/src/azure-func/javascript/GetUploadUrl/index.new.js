const azure = require('azure-storage');
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

module.exports = function (context, req) {
    const rawFileName = req.query.fileName;
    let dotIndex = rawFileName.lastIndexOf(".")
    let extension = rawFileName.slice(dotIndex+1)

    const container = req.query.blobName;
    const userId = req.query.userId;
    
    const blobService = azure.createBlobService();

    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 60 * 1000);
    const expiryDate = new Date(currentDate.getTime() + 5 * 60 * 1000);

    const permissions = 
        azure.BlobUtilities.SharedAccessPermissions.READ +
        azure.BlobUtilities.SharedAccessPermissions.WRITE +
        azure.BlobUtilities.SharedAccessPermissions.CREATE;

    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };

    let videoCollection = client.database(databaseId).container(containerId)

    videoCollection.items.readAll()
        .toArray()
        .then(r=>{
            if(r.result.length>0){
                let lastVideoInfo = r.result[r.result.length-1]
                let videoInfo = {
                    id: `v-${lastVideoInfo.indexNum+1}`,
                    userId: userId,
                    indexNum: lastVideoInfo.indexNum+1,
                    rawFileName: rawFileName,
                    status: "uploading",
                    uploadDate: Date.now(),
                }
                videoInfo.storeName = `${videoInfo.id}-${videoInfo.uploadDate}.${extension}`
                const sasToken = blobService.generateSharedAccessSignature(container, videoInfo.storeName, sharedAccessPolicy);
                videoCollection.items.create(videoInfo)
                                .then(r=>{
                                    context.log(r)
                                    context.res = {
                                        url: blobService.getUrl(container, videoInfo.storeName, sasToken)
                                    }
                                    context.done()
                                })
                                .catch(err=>{
                                    context.log(err)
                                    throw err;
                                })
            }else{

                let videoInfo = {
                    id: "v-1",
                    userId: userId,
                    indexNum: 1,
                    rawFileName: rawFileName,
                    status: "uploading",
                    uploadDate: Date.now(),
                }
                videoInfo.storeName = `${videoInfo.id}-${videoInfo.uploadDate}.${extension}`

                const sasToken = blobService.generateSharedAccessSignature(container, videoInfo.storeName, sharedAccessPolicy);
                videoCollection.items.create(videoInfo)
                                .then(r=>{
                                    context.log(r)
                                    context.res = {
                                        url: blobService.getUrl(container, videoInfo.storeName, sasToken)
                                    }
                                    context.done()
                                })
                                .catch(err=>{
                                    context.log(err)
                                    throw err;
                                })
            }
        })
        .catch(err=>{
            context.log(err)
            context.done()
        })
};
