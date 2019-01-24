import React from 'react';
import { connect } from 'react-redux'; 
import { Button, Input, Tabs, message } from 'antd';
const TabPane = Tabs.TabPane;
import * as UTIL from '@libs/util';
import './login.less';
import { setUserInfo } from '@store/reducer/user';
import * as API from '@api/index';
import loginImg from '@assets/images/bg_login.jpg';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            account: '',
            password: '',
            cfpassword: '',
            tMoving: false,
            activeKey: '1'
        };
    }

    /**
    * @author dven 
    * @description 组件已经挂载
    */
    componentDidMount(){
        
    }

    /**
    * @author dven 
    * @description 改变用户名 
    */
    inputUsername = (e) => {
        e.persist();
        let username = e.target.value;
        this.setState({ username });
    }

    /**
    * @author dven 
    * @description 改变用户名 
    */
    inputPassword = (e) =>{
        e.persist();
        let password = e.target.value;
        this.setState({ password });
    }

    /**
    * @author dven 
    * @description 改变再次输入密码
    */
    inputcfPassword = (e) =>{
        e.persist();
        let cfpassword = e.target.value;
        this.setState({ cfpassword });
    }

    inputAccount = (e) => {
        e.persist();
        let account = e.target.value;
        this.setState({ account });
    }

    /**
    * @author dven 
    * @description 登录按钮 
    */
    login = async () => {
        let data = {
            account: this.state.account,
            password: this.state.password
        };
        if (this.checkLoginParam(data)) {
            let res = await API.login({
                account: this.state.account,
                password: this.state.password
            })
            this.setUserInfo(res);
        }
    }

    /**
    * @author dven 
    * @description 查询 
    * @param
    */
    checkLoginParam = (data) =>{
        if (data.username !== '' && data.password !== '') {
            return true;
        }
        message.error('请输入用户名或密码');
        return false;
    }

    /**
    * @author dven 
    * @description 登录按钮 
    */
    register = async () => {
        if (this.checkRegister() && this.checkConfirmPassword()) {
            let data = {
                user_name: this.state.username,
                account: this.state.account,
                password: this.state.password
            };
            let res = await API.register(data);
            this.setUserInfo(res);
        }
    }

    /**
    * @author dven 
    * @description 保存用户信息 
    * @param {Object} userInfo 
    */
    setUserInfo = (userInfo) => {
        if (userInfo && userInfo.user_name) {
            this.props.setUserInfo({
                nickname: userInfo.user_name
            });
            UTIL.setUserInfoCookie({ nickname: userInfo.user_name, token: userInfo.token, fid: userInfo.fid });
            this.props.history.push('/food/index');
        }
    }

    /**
    * @author dven 
    * @description 校验二次确认密码 
    */
    checkConfirmPassword = () =>{
        if (this.state.password !== this.state.cfpassword) {
            message.error('两次密码不准确');
            return false;
        }
        return true;
    }

    /**
    * @author dven 
    * @description 校验注册数据 
    */
    checkRegister = () =>{
        if (this.state.password === '' || this.state.cfpassword === '' || this.state.account === '' || this.state.username === '') {
            message.error('请填写完整信息');
            return false;
        }
        return true;
    }

    /**
    * @author dven 
    * @description 确认更改密码 
    */
    confirmResetPassword = async () => {
        if (this.state.password === '' || this.state.account === '') {
            message.error('请填写完整信息');
            return false;
        }
        let res = await API.resetUserPassword({
            account: this.state.account,
            password: this.state.password
        });
        if (res) {
            message.success('修改用户密码成功');
            this.setState({
                activeKey: '1'
            })
        }
    }

    tabsChange = (e) => {
        this.setState({
            activeKey: e
        })
    }

    render(){
        let state = this.state;
        return(
            <div>
                <div className='background-area'>
                    <div className='bgmask'></div>
                    <div className='title'>都城快餐</div>
                    <Tabs className='tab-area' activeKey={state.activeKey} onChange={this.tabsChange}>
                        <TabPane tab="登录" key="1">
                            <div className='input-area'>
                                <Input className='input' onChange={this.inputAccount} value={state.account} placeholder="账户名"/>
                                <Input type='password' className='input' onPressEnter={this.login} onChange={this.inputPassword} value={state.password} placeholder="密码"/>
                            </div>
                            <Button type='primary' className='login-btn' onClick={this.login}>登录</Button>  
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <div className='input-area'>
                                <Input className='input' onChange={this.inputAccount} value={state.account} placeholder="账户名"/>
                                <Input className='input' onChange={this.inputUsername} value={state.username} placeholder="真实姓名"/>
                                <Input type='password' className='input' onChange={this.inputPassword} value={state.password} placeholder="密码"/>
                                <Input type='password' className='input' onPressEnter={this.register} onChange={this.inputcfPassword} value={state.cfpassword} placeholder="再次确认密码" />
                            </div>
                            <Button type='primary' className='login-btn' onClick={this.register}>注册</Button> 
                        </TabPane>
                        <TabPane tab="更改密码" key="3">
                            <div className='input-area'>
                                <Input className='input' onChange={this.inputAccount} value={state.account} placeholder="账户名"/>
                                <Input type='password' className='input' onPressEnter={this.confirmResetPassword} onChange={this.inputPassword} value={state.password} placeholder="新的密码"/>
                            </div>
                            <Button type='primary' className='login-btn' onClick={this.confirmResetPassword}>确认更改密码</Button> 
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = {
    setUserInfo: setUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);