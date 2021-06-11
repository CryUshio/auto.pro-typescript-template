const os = require('os');
const fsx = require('fs-extra');

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const interface = interfaces[devName];
    for (const i = 0; i < interface.length; i++) {
      const alias = interface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const host = getIPAddress();
fsx.writeJSONSync('.config.json', { host }, { spaces: 2 });
