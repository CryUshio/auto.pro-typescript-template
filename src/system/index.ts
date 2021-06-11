import core, { closeForeground, setSystemUiVisibility } from '@auto.pro/core';
import { run } from '@auto.pro/webview';
import { fromEvent, race, timer } from 'rxjs';
import { share, exhaustMap, tap } from 'rxjs/operators';
import { HOST, PORT } from '../../config/config';

core({
  baseWidth: 720,
  baseHeight: 1280,
  needCap: '竖屏',
  needFloaty: true,
  needService: true,
  capType: '同步',
  needForeground: true,
});

const webUrl =
  process.env.NODE_ENV === 'development'
    ? `http://${HOST}:${PORT}`
    : `file://${files.path('renderer/index.html')}`;

export const webview = run(webUrl, {
  afterLayout() {
    setSystemUiVisibility('有状态栏的沉浸式界面');
  },
});

// 监听退出事件，关闭前台服务
events.on('exit', () => {
  closeForeground();
});

// 监听返回键并共享事件
const back$ = fromEvent(ui.emitter, 'back_pressed').pipe(share());
back$
  .pipe(
    exhaustMap((e: any) => {
      toast('再次返回可退出');
      e.consumed = true;
      return race(back$.pipe(tap(() => (e.consumed = false))), timer(2000));
    }),
  )
  .subscribe();
