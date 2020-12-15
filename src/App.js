import React from 'react';
import './App.css';
import './font/iconfont.css'

// 自定义打印个人信息函数
import myConsole from 'utils/console'

// 路由
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// Redux相关操作
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from "redux-thunk";
import { My_redux } from 'myredux/myRedux'

import loadable from 'utils/loadable'

const Login = loadable(() => import('views/login/login'))
const Content = loadable(() => import('views/content/content'))

// redux开发插件
const store = createStore(My_redux, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

function App() {
  myConsole()
  return (
    <div className="myApp">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Content />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
