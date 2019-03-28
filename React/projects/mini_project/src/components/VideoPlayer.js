import React from 'react'
import videojs from 'video.js'
import { Icon } from 'antd'
import 'video.js/dist/video-js.css'
import './VideoPlayer.css'
import functionApi from '../api/Api'

/*
    VideoPlayer Component
    this component based on [video.js](https://github.com/videojs/video.js)
    offer a full screeen modal to play video
*/

class VideoPlayer extends React.Component {

    componentDidMount(){
        if(this.props.playerVisibility && this.videoNode){
            this.player = videojs(this.videoNode, this.props, function onPlayerReady(){
                console.log("--- video player ready ---")
            })
        }
    }

    componentWillUnmount(){
        if(this.player && this.videoNode){
            console.log('--- player dispose ---')
            this.player.dispose()
        }
    }

    handleExitClick= () =>{
        if(this.player && this.videoNode){
            console.log(this.props)
            let videoId = this.props.videoInfo.id
            let watchedTime = this.player.currentTime()
            let duration = this.player.duration()
            console.log(videoId, watchedTime, duration)
            if(watchedTime !== this.props.videoInfo.watchedTime){
                functionApi.UpdateWatchTime(videoId, watchedTime)
                .then(r=>{
                    console.log(r)
                    if(r.data === "user_video updated!"){
                        this.props.onUpdateWatchedTime(videoId, watchedTime, duration)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            this.player.dispose()
        }
        this.props.onPlayerExit()
    }

    componentDidUpdate(prevProps){
        if (this.props.playerVisibility !== prevProps.playerVisibility) {
            if(this.props.playerVisibility && this.videoNode){
                let ctx = this
                this.player = videojs(this.videoNode, this.props, function onPlayerReady(){
                    console.log("--- did update: video player ready ---")
                    ctx.player.currentTime(ctx.props.videoInfo.watchedTime)
                })
            }
        }
    }

    render() {
        let visibility = this.props.playerVisibility;
        return visibility?(
            <div className="video-player">
                <div className="exit-btn" onClick={this.handleExitClick}>
                    <Icon type="close" style={{color:"white", fontSize:"5vmin"}}/>
                </div>
                <div className="player-container">
                    <video 
                      ref={ node => this.videoNode = node }
                      className="video-js"
                    >
                    </video>
                </div>
            </div>
        ):null
    }
}

export default VideoPlayer;