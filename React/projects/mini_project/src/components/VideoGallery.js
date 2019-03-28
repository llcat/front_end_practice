import React from 'react'
import VideoCard from './VideoCard'
import VCToolBar from './VCToolBar'
import faker from 'faker'
import "./VideoGallery.css"
import VideoPlayer from './VideoPlayer'
import functionApi from '../api/Api'
import { Empty, Spin, notification } from 'antd'

class VideoGallery extends React.Component {

    constructor(props){
        super(props)
        this._videoInfoList = null
        this.state = {
            playerVisibility: false,
            loadingVideo: false,
            videoInfoList: this._videoInfoList
        }
    }

    // receive a seconds value and convert it to hh:mm:ss format
    // 200s -> 03:20
    // 8811 -> 02:26:51
    timeConvert = (seconds)=>{
        let s = Math.round(Number.parseFloat(seconds))
        let m = Math.floor(s / 60)
        let ls = s % 60
        let h = Math.floor(m / 60)
        let lm = m % 60
        let lsStr = ls<10?`0${ls}`:`${ls}`
        let lmStr = lm<10?`0${lm}`:`${lm}`
        let timeStr = h===0?`${lmStr}:${lsStr}`:`${h}:${lmStr}:${lsStr}`
        return timeStr
    }

    reqErrorNotification = (method, err) =>{
        let options = {
            message: `${method} Fail`,
            description: `${err}`,
            duration:6
        }
        notification.open(options)
    }

    componentDidMount(){
        functionApi.ListAllVideos(this.props.userInfo.nickName)
            .then(r=>{
                console.log(r)
                let infoList = r.data
                this._videoInfoList = infoList.map(this.formatVideoInfo)
                this.setState({
                    videoInfoList: this._videoInfoList
                })
            })
            .catch(err=>{
                console.log(err)
                this.reqErrorNotification("ListAllVideos",err)
            })
    }

    onFavoriteVideo = (videoId, flag) => {
        console.log(typeof videoId)
        console.log(videoId, flag)
        this._videoInfoList = this._videoInfoList.map(v=>{
            if(v.id === videoId){
                v.favorite = flag
            }
            return v
        })
        this.setState({
            videoInfoList: this._videoInfoList
        })
    }

    onDeleteVideo = (videoId) => {
        this._videoInfoList = this._videoInfoList.filter(v=>{
            return v.id !== videoId
        })
        this.setState({
            videoInfoList: this._videoInfoList
        })
    }

    onUpdateWatchedTime = (videoId, watchedTime, duration) => {
        this._videoInfoList = this._videoInfoList.map(v=>{
            if(v.id === videoId){
                v.watched = true
                v.watchedTime = watchedTime
                v.watchedProgress = this.timeConvert(watchedTime)
                v.duration = duration
                v.durationStr = this.timeConvert(duration)
                v.watchedPercent = Math.floor((watchedTime/duration)*100)
            }
            return v
        })
        this.setState({
            videoInfoList: this._videoInfoList
        })
    }

    /*
        return format info
        {
            id,
            title,
            duration,
            durationStr,
            watchedTime,
            watched,
            watchedProgress,
            watchedPercent,
            favorite,
            videoSrc,
            previewSrc
        }
    */
    formatVideoInfo = (info)=>{
        let r = {}
        r.id = info.id
        r.title = info.video_id
        r.duration = 0
        r.durationStr = "--:--"
        r.watchedTime = Math.round(Number.parseFloat(info.played_time))
        if(r.watchedTime === 0){
            r.watched = false
            r.watchedProgress = this.timeConvert(0)
        }else{
            r.watched = true
            r.watchedProgress = this.timeConvert(r.watchedTime)
        }
        r.watchedPercent = 0
        r.favorite = info.favorite_flag==="true"?true:false
        r.videoSrc = info.video_url
        r.previewSrc = faker.image.image()
        return r
    }

    onVideoStartPlay = (startPlay, options) =>{
        this.setState({
            playerVisibility: startPlay,
            videoOptions: options
        })
    }

    onPlayerExit = () => {
        this.setState({
            playerVisibility: false,
        })
    }

    renderVideoInfoList = (videoInfoList)=>{
        if(videoInfoList==null){
            return (
                <Spin tip="loading">
                    <div style={{width:'20vw',height:"20vh"}}></div>
                </Spin>
            )
        }
        if(videoInfoList.length>0){
            return videoInfoList.map(v=>{
                return (
                    <VideoCard 
                        key={v.id} 
                        videoInfo={v} 
                        onVideoStartPlay = {this.onVideoStartPlay}
                    >
                        <VCToolBar 
                            key={`tool-${v.id}`} 
                            videoInfo={v} 
                            onFavoriteVideo={this.onFavoriteVideo}
                            onDeleteVideo={this.onDeleteVideo}
                        />
                    </VideoCard>
                )
            })
        }else{
            return <Empty description="暂无视频~" />
        }
    }

    render() {
        let { videoInfoList } = this.state
        
        return (
            <div className="video-gallery">
                <div className="gallery-title">
                    <h4>video gallery</h4>
                </div>
                <div className="gallery-container">
                    {this.renderVideoInfoList(videoInfoList)}
                </div>
                <VideoPlayer 
                  onUpdateWatchedTime={this.onUpdateWatchedTime}
                  onPlayerExit={this.onPlayerExit}
                  playerVisibility={this.state.playerVisibility}
                  {...this.state.videoOptions}
                />
            </div>
        )
    }

}

export default VideoGallery;