declare module '@auto.pro/web' {
  type Fn = (...args: any[]) => any;
  interface IAutoWeb {
    setMode(mode: 'console.log' | 'prompt'): void;
    devicelly(deviceFn: string, ngFn: Fn, self?: any, once?: boolean): void;
    removeDevicelly(deviceFn: string): void;
    auto(eventname: string, params?: any, callback?: Fn): any;
  }
  const AutoWeb: IAutoWeb;
  export default AutoWeb;
}
