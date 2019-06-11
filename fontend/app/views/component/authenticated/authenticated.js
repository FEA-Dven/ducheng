import React from 'react'
import * as UTIL from '@libs/util';

function requireAuthentication(Component) {
    // 组件有已登陆的模块 直接返回 (防止从新渲染)
    if (Component.AuthenticatedComponent) {
        return Component.AuthenticatedComponent
    }
    // 创建验证组件
    class AuthenticatedComponent extends React.Component {
        state = {
            login: true,
        }
        componentWillMount() {
            this.checkAuth();
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }
        checkAuth() {
            // 未登陆重定向到登陆页面
            let login = UTIL.shouldRedirectToLogin();
            if (login) {
                window.location.href = '/food/login';
                return;
            }
            this.setState({ login: !login });
        }
        render() {
            if (this.state.login) {
                return <Component {...this.props} />
            }
            return ''
        }
    }
    return AuthenticatedComponent
}

module.exports = {
    requireAuthentication
};