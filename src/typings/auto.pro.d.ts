type ScreenType = '横屏' | '竖屏';
interface Thread {
  [key: string]: any;
}

declare const com: any;

interface AutoStorage {
  /**
   * 取key对应的值，值不存在时返回defaultValue或undefined
   * @param key
   * @param defaultValue
   */
  get(key: string, defaultValue?: any): any;
  /**
   * 把value保存到key，value必须是可JSON化的值
   * @param key
   * @param value
   */
  put(key: string, value: any): void;
  /**
   * 移除key对应的数据
   * @param key
   */
  remove(key: string): void;
  /**
   * 是否存在key对应的数据
   * @param key
   */
  contains(key: string): boolean;

  /**
   * 清除所有数据
   */
  clear(): void;
}

type Interpolation = 'LINEAR' | 'NEAREST' | 'AREA' | 'CUBIC' | 'LANCZOS4';
type ThresholdType =
  | 'BINARY'
  | 'BINARY_INV'
  | 'TRUNC'
  | 'TOZERO'
  | 'TOZERO_INV'
  | 'OTSU'
  | 'TRIANGLE';
type BlurType =
  | 'DEFAULT'
  | 'CONSTANT'
  | 'REPLICATE'
  | 'REFLECT'
  | 'WRAP'
  | 'REFLECT_10'
  | 'TRANSPARENT'
  | 'REFLECT101'
  | 'ISOLATED';
type RegionType = [number, number] | [number, number, number, number];

declare const $settings: {
  isEnabled(str: string): boolean;
  setEnabled(str, state: boolean): void;
};

declare const activity: any;
declare const dialogs: any;
declare const storages: {
  create(text: string): AutoStorage;
  remove(text: string): boolean;
};
declare function log(text: string, ...args): void;
declare function toastLog(text: string): void;

declare const Animator: any;
declare const AnimatorSet: any;
declare const ObjectAnimator: any;
declare const context: any;
declare const java: any;
declare function waitForPackage(packageName: string, eachTime?: number): void;

declare const runtime: any;
declare const android: any;
declare const ui: any;
declare const JavaAdapter: any;
declare const WebView: any;
declare const WebChromeClient: any;
declare const WebResourceResponse: any;
declare const WebViewClient: any;
declare const ValueCallback: any;
declare const threads: any;
declare const events;
declare const importClass;
declare const org;
declare const $shell: any;
declare const files;
declare const auto: any;
declare const app: any;

declare function toast(str: string): void;
declare function exit(num?: number): void;
declare function sleep(low: number, up?: number): void;
declare function Tap(x: number, y: number): void;
declare function press(x: number, y: number, delay: number): void;
declare function random(low: number, up: number): number;
declare function Swipe(x1: number, y1: number, x2: number, y2: number, duration: number): void;
declare function gesture(duration: number, ...points: Array<number>): void;
