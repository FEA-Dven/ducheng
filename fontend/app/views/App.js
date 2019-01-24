import React from 'react';
import Login from '@app/views/login/login';
import Index from '@app/views/index/index';
import Chat from '@app/views/chat/chat';
import createBrowserHistory from 'history/createBrowserHistory';
let browserHistory = createBrowserHistory();
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '@store/index'
import * as UTIL from '@libs/util';
import { requireAuthentication } from '@component/authenticated/authenticated';
import Nomatchpage from '@component/nomatchpage/nomatchpage';
import '../style/app.less';

export default class App extends React.Component {
    constructor(){
        super();
    }

    componentDidMount = () => {
        let url = this.getUrl();
        let toLoginUrlData = ['/food/', '/food'];
        for (let targetUrl of toLoginUrlData) {
            if (targetUrl === url && UTIL.shouldRedirectToLogin()) {
                window.location.href = 'login';
                return;
            }
            if (targetUrl === url) {
                window.location.href = 'index';
                return;
            }
        }
    }

    getUrl = () =>{
        let host = window.location.host;
        let url = window.location.href.split(host);
        url = url[url.length - 1];
        return url;
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <Router history={browserHistory} >
                        <Switch>
                            <Route path="/food/login" exact component={Login}/>
                            <Route path="/food/index" component={requireAuthentication(Index)}/>
                            <Route path="/food/chat" component={requireAuthentication(Chat)}/>
                            <Route component={Nomatchpage}/>
                        </Switch>
                    </Router>
                </Provider>
            </div>
        );
    }
};