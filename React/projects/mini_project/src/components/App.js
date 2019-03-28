import React from 'react';
import LoginForm from './LoginForm';
import TopHeader from './TopHeader';
import OperateMenu from './OperateMenu'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import FileUpLoader from './FileUpLoader'
import VideoGallery from './VideoGallery'
import Welcome from './Welcome'
import './App.css';
import db from '../util/db'

const { Content } = Layout

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this)
        this.onUserLogOut = this.onUserLogOut.bind(this)
    }

    componentDidMount(){
        db.getCurrentUser()
            .then(userInfo=>{
                if(Object.keys(userInfo).length>0){
                    this.setState({
                        userInfo: userInfo
                    })
                    this.props.history.replace("/home")
                }
            })
            .catch(err=>{
                this.props.history.replace("/login")       
            })
    }

    onLoginFormSubmit(userInfo){
        db.setCurrentUser(userInfo)
        this.setState({
            userInfo: userInfo
        })
    }

    onUserLogOut(){
        db.removeCurrentUser()
        this.setState({
            userInfo: {}
        })
    }

    render() {
        return (
            <div className="app">
                <Route path="/" render={(props) => {
                    return (
                        <TopHeader 
                            {...props} 
                            userInfo={this.state.userInfo}
                            onUserLogOut={this.onUserLogOut}
                        />
                    )
                }}
                />
                <Route path="/login" render={(props) => (
                    <LoginForm 
                    {...props} 
                    onLoginFormSubmit={this.onLoginFormSubmit} 
                    />
                )} />
                <Route path="/home" render={(props) => (
                    Object.keys(this.state.userInfo).length>0?(
                        <div className="main-container">
                            <Layout>
                                <OperateMenu {...props} />
                                <Content style={{margin:"0 2vw"}}>
                                    <Switch>
                                        <Route 
                                            path={props.match.url+"/gallery"} 
                                            render={(props)=>{
                                                return (
                                                    <VideoGallery userInfo={this.state.userInfo} />
                                                )
                                            }} 
                                        />
                                        <Route 
                                            path={props.match.url+"/upload"} 
                                            render={(props) => {
                                                return (
                                                    <FileUpLoader userInfo={this.state.userInfo} />
                                                )
                                            }} 
                                        />
                                        <Route component={Welcome} />
                                    </Switch>
                                </Content>
                            </Layout>
                        </div>
                    ):null
                )} />
            </div>  
        );
    }

}

export default withRouter(App);

