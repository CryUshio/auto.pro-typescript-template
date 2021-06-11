import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import AutoWeb from '@auto.pro/web';

import './app.less';

class App extends Component {
  handleClick = () => {
    // 触发 auto 的 hello 通信事件，传递参数为 'Hello server!'，并指定为异步响应，异步响应可以接收到多个参数
    AutoWeb.auto('hello', 'Hello server!', function (res: string) {
      // auto 端执行 done 后，将会执行此函数
      alert(res);
    });
  };

  render() {
    return (
      <section className="main-layout">
        <section className="main-container">
          <h1>Hello, AutoJS!</h1>
          <button onClick={this.handleClick}>Send message</button>
        </section>
      </section>
    );
  }
}

export default hot(App);
