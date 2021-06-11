interface Plugins {
  /**
   * @function 加载插件
   * @param {String} packageName 包名
   */
  load: (packageName: string) => any;
}

declare const $plugins: Plugins;
