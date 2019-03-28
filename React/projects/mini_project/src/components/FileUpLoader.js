import React from 'react'
import { Upload, Button, Icon } from 'antd';
import functionApi from '../api/Api'
import axios from 'axios'
import './FileUpLoader.css'

class FileUpLoader extends React.Component {

    handleRequest = (upload) => {
        console.log(upload)
        let file = upload.file
        let userInfo = this.props.userInfo
        functionApi.getUploadUrl(file.name, userInfo.nickName)
        .then(rep=>{
            let data = rep.data
            const config = {
                headers: {
                  'Content-Type': 'application/octet-stream',
                  'x-ms-version': '2017-04-17',
                  'x-ms-blob-type': 'BlockBlob',
                  'x-ms-blob-content-type': file.type
                },
                onUploadProgress(e) {
                    console.log(e)
                    upload.onProgress({
                        percent: e.loaded/e.total*100
                    })
                }
              }
            axios.put(data.url, file, config)
            .then(rep=>{
                console.log("put rep:", rep)
                upload.onSuccess(rep)
            })
            .catch(err=>{
                console.log("err:", err)
                upload.onError(err)
            })
        })
    }

    render() {
        return (
            <div className="file-uploader">
                <h4>
                    file upload
                </h4>
                <Upload
                  customRequest={this.handleRequest}
                >
                    <Button>
                        <Icon type="upload" /> 选择视频文件
                    </Button>
                </Upload>
            </div>
        )
    }
}

export default FileUpLoader;