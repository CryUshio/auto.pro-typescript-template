// 不用 dotenv 之类的是因为不支持 node 的 AutoJS 会报错
const config = require('../.config.json');

export const HOST = config.host;
export const PORT = 3000;
