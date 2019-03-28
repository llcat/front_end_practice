import React from 'react'
import { Icon } from 'antd'
import './VCToolBar.css'
import functionApi from '../api/Api'

/*
    VideoCardToolBar Compnnent
    offer function: favorite, delete video, and show watched
*/

class VCToolBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loadFavorite: false,
            loadDelete: false
        }
    }
    
    handleFavoriteClick = ()=>{
        // Todo: need backend api support
        this.setState({
            loadFavorite: true
        })
        let flag = !this.props.videoInfo.favorite
        let flagStr = flag?"true":"flase"
        console.log(flag, flagStr)
        functionApi.FavoriteQueryVideo(this.props.videoInfo.id, flagStr)
            .then(r=>{
                console.log(r)
                this.setState({
                    loadFavorite:false
                })
                if(r.data === "user_video updated!"){
                    this.props.onFavoriteVideo(this.props.videoInfo.id, flag)
                }
            })
            .catch(err=>{
                this.setState({
                    loadFavorite:false
                })
            })
    }

    handleDeleteClick = ()=>{
        // Todo: need backend api support
        console.log("delete click")
        this.setState({
            loadDelete: true
        })
        
        let video_id = this.props.videoInfo.title
        functionApi.DeleteVideo(video_id)
            .then(r=>{
                this.setState({
                    loadDelete:false
                })
                console.log(r)
                if(r.data === "OK" || r.data ==="Data not found."){
                    this.props.onDeleteVideo(this.props.videoInfo.id)
                }
            })
            .catch(err=>{
                this.setState({
                    loadDelete:false
                })
            })
    }

    renderFavoriteIcon = (loadFavorite, favorite)=>{
        if(loadFavorite){
            return <Icon className="vc-sync" type="sync" spin />
        }else{
            if(favorite){
                return <Icon 
                            className="vc-favorite" 
                            type="heart" 
                            theme="filled" 
                            style={{color:"red"}}
                            onClick={this.handleFavoriteClick}
                       />
            }else{
                return <Icon className="vc-favorite" type="heart" onClick={this.handleFavoriteClick} />
            }
        }
    }


    render(){
        const { videoInfo } = this.props
        console.log(videoInfo)
        return (
            <div className="vc-tool-bar">
                {videoInfo.watched?<Icon className="vc-watched" type="eye"/>:null}
                {this.renderFavoriteIcon(this.state.loadFavorite,videoInfo.favorite)}
                {
                    this.state.loadDelete?
                    <Icon className="vc-sync" type="sync" spin />
                    :<Icon className="vc-delete" type="delete" onClick={this.handleDeleteClick} />
                }
            </div>
        )
    }
}

export default VCToolBar;