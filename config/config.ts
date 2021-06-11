import dotenv from 'dotenv';

interface EnvConfig {
  host: string;
}

// 从根目录下的 .env 文件获取配置
const envConfig = dotenv.config().parsed as unknown as EnvConfig;

export const HOST = envConfig.host;
export const PORT = 3000;
