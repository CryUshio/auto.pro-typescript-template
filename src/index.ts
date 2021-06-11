import { webview } from '@/system';
import { effect$ } from '@auto.pro/core';

// effect$是作业线程，当core的权限全部到位后，effect$才开始运作
effect$.subscribe(() => {
  toastLog('权限已经到位');

  // 监听 html 的 hello 事件
  webview.on('hello').subscribe(([param, done]) => {
    toastLog(`点击了按钮，获得参数 ${param} `);

    // 使用 done 给 html 返回结果，这里返回获得的参数
    done('Server: Hello client!');

    // 文档地址：http://www.moly.host:30030/#/modules/webview
    webview.runHtmlJS('document.title').subscribe((v) => {
      toastLog(`title is ${v}`);
    });
  });
});
