import React from 'react';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, hashHistory } from 'react-router';
let browserHistory = createBrowserHistory();

import App from '@app/views/App';

ReactDom.render(
    <App />,
    document.getElementById('app')
);