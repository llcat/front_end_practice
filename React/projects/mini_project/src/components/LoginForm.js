import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Modal, Spin, message
} from 'antd';
import './LoginForm.css';
import functionApi from '../api/Api'

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props)
        this._registerModel = {
            phone: {
                value: ""
            },
            password: {
                value: ""
            },
            confirmpwd: {
                value: ""
            },
            nickname: {
                value: ""
            }
        }
        this.state = {
            waitRegister: false,
            waitLogin: false,
            registerModalVisibility: false,
            registerModel: this._registerModel
        }
    }

    validateFields = (id, value) => {
        switch(id){
            case "phone":
                let phone = Number.parseInt(value)
                if((!Number.isNaN(phone)) && value.length===11){
                    return {
                        validateStatus: "success",
                        help: null
                    }
                }else {
                    return {
                        validateStatus: "warning",
                        help: "请填写11位手机号码!"
                    }
                }
            case "password":
                let password = value;
                if(password.length>=6){
                    return {
                        validateStatus: "success",
                        help: null
                    }
                }else {
                    return {
                        validateStatus: "warning",
                        help: "密码长度至少6位!"
                    }
                }
            case "confirmpwd":
                let pwd = this._registerModel.password.value
                let confirmpwd = value
                if(pwd === confirmpwd && pwd.length>0){
                    return {
                        validateStatus: "success",
                        help: null
                    }
                }else {
                    return {
                        validateStatus: "warning",
                        help: "请确认密码!"
                    }
                }
            case "nickname":
                let nickname = value
                if(nickname.length>0){
                    return {
                        validateStatus: "success",
                        help: null
                    }
                }else {
                    return {
                        validateStatus: "warning",
                        help: "请填写用户昵称!"
                    }
                }
            default:
                break
        }
    }

    handleFieldsChange = (e) => {
        this._registerModel = {
            ...this._registerModel,
            [e.target.id]: {
                ...this.validateFields(e.target.id, e.target.value),
                value: e.target.value
            }
        }
        this.setState({
            registerModel: this._registerModel
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    waitLogin: true
                })
                functionApi.mockLogin(values)
                    .then(r=>{
                        console.log(r)
                        this.setState({
                            waitLogin: false
                        })
                        let data = r
                        if(data.status === "success"){
                            message.success(data.info)
                            this.props.onLoginFormSubmit(data.userInfo)
                            this.props.history.replace("/home")
                        }else if(data.status === "fail"){
                            message.error(data.info)
                        }else if(data.status === "no_register"){
                            message.warn(data.info)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        this.setState({
                            waitLogin: false
                        })
                    })
                // functionApi.UserLogin(values)
                //     .then(rep=>{
                //         this.setState({
                //             waitLogin: false
                //         })
                //         console.log(rep)
                //         let data = rep.data
                //         if(data.status === "success"){
                //             message.success(data.info)
                //             this.props.onLoginFormSubmit(data.userInfo)
                //             this.props.history.replace("/home")
                //         }else if(data.status === "fail"){
                //             message.error(data.info)
                //         }else if(data.status === "no_register"){
                //             message.warn(data.info)
                //         }
                //     })
                //     .catch(err=>{
                //         this.setState({
                //             waitLogin: false
                //         })
                //         console.log(err)
                //     })
            }
        });
    }

    showRegisterModal= (e)=>{
        e.preventDefault()
        this.setState({
            registerModalVisibility: true
        })
    }

    handleOk = () => {
        let canSubmit = true
        for(let key in this._registerModel){
            this._registerModel = {
                ...this._registerModel,
                [key]: {
                    ...this.validateFields(key, this._registerModel[key].value),
                     value: this._registerModel[key].value
                }
            }
            canSubmit = canSubmit && this._registerModel[key].validateStatus==="success"
        }
        this.setState({
            registerModel: this._registerModel
        })
        if(canSubmit){
            this.setState({
                waitRegister: true
            })
            functionApi.mockRegister(this._registerModel)
                .then(r=>{
                    this.setState({
                        waitRegister: false
                    })
                    console.log(r)
                    let data = r
                    if(data.status === "success"){
                        message.success(data.info)
                        this.setState({
                            registerModalVisibility: false
                        })
                    }else if(data.status === "fail"){
                        message.warning(data.info)
                    }
                })
                .catch(err=>{
                    console.log(err)
                    this.setState({
                        waitRegister: false
                    })
                })
            // functionApi.UserRegister(this._registerModel)
            //     .then(rep=>{
            //         console.log(rep)
            //         this.setState({
            //             waitRegister: false
            //         })
            //         let data = rep.data
            //         if(data.status === "success"){
            //             message.success(data.info)
            //             this.setState({
            //                 registerModalVisibility: false
            //             })
            //         }else if(data.status === "fail"){
            //             message.warning(data.info)
            //         }
            //     })
            //     .catch(err=>{
            //         console.log(err)
            //         this.setState({
            //             waitRegister: false
            //         })
            //     })
        }
    }

    handleCancel = () => {
        this.setState({
            registerModalVisibility: false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { phone, password, confirmpwd, nickname } = this.state.registerModel
        return (
            <div className="form-container">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone!' }],
                    })(
                        <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="/">Forgot password</a>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      className="login-form-button" 
                      loading={this.state.waitLogin}>
                        Log in
                    </Button>
                    Or <a href="/login" onClick={this.showRegisterModal}>register now!</a>
                </Form.Item>
            </Form>
            <Modal
                title="User Sign Up"
                visible={this.state.registerModalVisibility}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="注册"
                cancelText="取消"
            >
                <Form>
                    <Form.Item
                      label="phone"
                      validateStatus={phone.validateStatus}
                      help={phone.help}
                    >
                        <Input 
                          id="phone"
                          prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)'}} />} 
                          placeholder="请输入手机号" 
                          allowClear
                          value = {phone.value}
                          onChange={this.handleFieldsChange}
                        />
                    </Form.Item>
                    <Form.Item
                      label="password"
                      validateStatus={password.validateStatus}
                      help={password.help}
                    >
                        <Input 
                          id="password"
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} 
                          placeholder="请输入密码" 
                          allowClear
                          type="password"
                          value={password.value}
                          onChange={this.handleFieldsChange}
                        />
                    </Form.Item>
                    <Form.Item
                      label="confirm password"
                      validateStatus={confirmpwd.validateStatus}
                      help={confirmpwd.help}
                    >
                        <Input 
                          id="confirmpwd"
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} 
                          placeholder="请再次输入密码确认" 
                          allowClear
                          type="password"
                          value={confirmpwd.value}
                          onChange={this.handleFieldsChange}
                        />
                    </Form.Item>
                    <Form.Item
                      label="nick name"
                      validateStatus={nickname.validateStatus}
                      help={nickname.help}
                    >
                        <Input 
                          id="nickname"
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} 
                          placeholder="请输入昵称" 
                          allowClear
                          value={nickname.value}
                          onChange={this.handleFieldsChange}
                        />
                    </Form.Item>
                </Form>
                <Spin tip="请稍等..." spinning={this.state.waitRegister}></Spin>
            </Modal>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
