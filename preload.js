// Preload script — runs before renderer process
// Keeps contextIsolation enabled for security
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
});
